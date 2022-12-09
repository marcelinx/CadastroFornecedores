import { db } from "../db.js";

export const getUsers = (_, res) => {
    const q = "SELECT * FROM usuarios";

    db.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
};

export const addUser = (req, res) => {
    const q =
    "INSERT INTO usuarios(`fornecedor`, `idsap`, `status`, `data_atualizacao`) VALUES(?)";

    const values = [
        req.body.fornecedor,
        req.body.idsap,
        req.body.status,
        req.body.data_atualizacao,
    ];

    db.query(q, [values], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Usuário criado com sucesso")
    });
};

export const updateUser = (req, res) => {
    const q =
      "UPDATE usuarios SET `fornecedor` = ?, `idsap` = ?, `status` = ?, `data_atualizacao` = ? WHERE `id` = ?";
  
    const values = [
      req.body.fornecedor,
      req.body.idsap,
      req.body.status,
      req.body.data_atualizacao,
    ];
  
    db.query(q, [...values, req.params.id], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Usuário atualizado com sucesso.");
    });
  };
  
  export const deleteUser = (req, res) => {
    const q = "DELETE FROM usuarios WHERE `id` = ?";
  
    db.query(q, [req.params.id], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Usuário deletado com sucesso.");
    });
  };