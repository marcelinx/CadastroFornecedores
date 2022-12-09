import axios from "axios";
import React , { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
    const ref = useRef();

    useEffect(() => {
      if (onEdit) {
        const user = ref.current;
  
        user.fornecedor.value = onEdit.fornecedor;
        user.idsap.value = onEdit.idsap;
        user.status.value = onEdit.status;
        user.data_atualizacao.value = onEdit.data_atualizacao;
      }
    }, [onEdit]);

    const handleSubmit = async (e) => {
      e.preventDefault();

      const user = ref.current;

      if (
        !user.fornecedor.value ||
        !user.idsap.value ||
        !user.status.value ||
        !user.data_atualizacao.value
      ) {
        return toast.warn("Preencha todos os campos!");
      }

      if (onEdit) {
        await axios
          .put("http://localhost:8800/" + onEdit.id, {
            fornecedor: user.fornecedor.value,
            idsap: user.idsap.value,
            status: user.status.value,
            data_atualizacao: user.data_atualizacao.value,
          })
          .then(({ data }) => toast.success(data))
          .catch(({ data }) => toast.error(data));
      } else {
        await axios
          .post("http://localhost:8800", {
            fornecedor: user.fornecedor.value,
            idsap: user.idsap.value,
            status: user.status.value,
            data_atualizacao: user.data_atualizacao.value,
          })
          .then(({ data }) => toast.success(data))
          .catch(({ data }) => toast.error(data));
      }
  
      user.fornecedor.value = "";
      user.idsap.value = "";
      user.status.value = "";
      user.data_atualizacao.value = "";
  
      setOnEdit(null);
      getUsers();
    };

    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <Label>Fornecedor</Label>
                <Input name="fornecedor"/>
            </InputArea>
            <InputArea>
                <Label>ID SAP</Label>
                <Input name="idsap"/>
            </InputArea>
            <InputArea>
                <Label>Status</Label>
                <Input name="status"/>
            </InputArea>
            <InputArea>
                <Label>Atualizado em:</Label>
                <Input name="data_atualizacao" type="date"/>
            </InputArea>

            <Button type="submit">Salvar</Button>
        </FormContainer>
    );
};

export default Form;