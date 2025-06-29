const express = require("express");
const router = express.Router();
const pool = require("../db");
const bcrypt = require("bcrypt");

// ȸ������ //
router.post("/register", async (req, res) => {
        console.log("ȸ������ ��û ����:", req.body);
    const { email, password, name,username, gender, birth, phone } = req.body;
    try {
        const hash = await bcrypt.hash(password, 10);
        const [result] = await pool.query(
            `INSERT INTO users (email, password_hash, username,name, gender, birth, phone)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [email, hash, username, name, gender, birth, phone]
        );
        res.json({ success: true, user_id: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "ȸ�������� �����Ͽ����ϴ�." });
    }
});

// �α��� //
router.post("/login", async (req, res) => {
    console.log("�α��� ��û ����:", req.body);
    const { email, password } = req.body;

    try {
        const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
        if (rows.length === 0) {
            return res.status(401).json({ success: false, message: "�������� �ʽ��ϴ�" });
        }

        const user = rows[0];
        const match = await bcrypt.compare(password, user.password_hash);
        if (!match) {
            return res.status(401).json({ success: false, message: "��й�ȣ�� �����ϴ�." });
        }

        res.json({
            success: true,
            user: {
                user_id: user.user_id,
                email: user.email,
                username: user.username
            }
        });
    } catch (err) {
        console.error("�α��� ���� : ", err);
        res.status(500).json({ success: false, message: "������ ������ �־�, �α����� ���� �ʽ��ϴ�." });
    }
});

//�׸� ������Ʈ //
router.post("/update-theme", async (req, res) => {
    const { user_id, theme } = req.body;


    //�׸� ��ȿ���˻�
    const validThemes = ["light", "dark", "gradient"];
    if (!validThemes.includes(theme)) {
        return res.status(400).json({ error: "�߸��� �׸� ��" });
    }

    try {
        await pool.execute(
            "UPDATE users SET theme = ? WHERE user_id = ?",
            [theme, user_id]
        );
        res.json({ success: true });
    } catch (err) {
        console.error("�׸� ���� ����:", err);
        res.status(500).json({ error: "���� ����" });
    }
});


// ����� ���� ��ȸ //
router.get("/userinfo", async (req, res) => {
    const userId = req.query.user_id;
    try {
        const [rows] = await pool.execute( //�򹮻���
            "SELECT user_id, email, username,name,theme FROM users WHERE user_id = ?",
            [userId]
        );
        if (rows.length === 0) return res.status(404).json({ error: "����� ����" }); 
        res.json(rows[0]);
    } catch (err) {
        console.error("���� ���� ��ȸ ����:", err);
        res.status(500).json({ error: "���� ����" });
    }
});

// �о� , ���� ���� API //
router.post("/save-user-fields", async (req, res) => {
    const { user_id, selections } = req.body;
    const conn = await pool.getConnection();

    try {
        await conn.beginTransaction();

        
        await conn.query("DELETE FROM user_fields WHERE user_id = ?", [user_id]);

        //���� �ʵ�
        const values = selections.map(({ field, level }) => [user_id, field, level]);
        if (values.length > 0) {
            await conn.query(
                "INSERT INTO user_fields (user_id, field, level) VALUES ?",
                [values]
            );
        }

        await conn.commit();
        res.json({ success: true });
    } catch (err) {
        await conn.rollback();
        console.error("�о�/���� ���� ����: 405", err);
        res.status(500).json({ success: false });
    } finally {
        conn.release();
    }
});

router.get("/user-fields", async (req, res) => {
    const { user_id } = req.query;
    try {
        const [rows] = await pool.query(
            "SELECT field, level FROM user_fields WHERE user_id = ?",
            [user_id]
        );
        res.json(rows); // ��: [{ field: 'english', level: 'beginner' }, ...]
    } catch (err) {
        console.error("�о�/���� ��ȸ ����:", err);
        res.status(500).json({ error: "���� ����" });
    }
});

module.exports = router;
