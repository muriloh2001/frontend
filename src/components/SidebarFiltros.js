import React, { useState } from "react";
import { Box, Slider, Typography, FormGroup, FormControlLabel, Checkbox, Button } from "@mui/material";

const SidebarFiltros = ({ setFilters }) => {
  // Estado do filtro de preço
  const [preco, setPreco] = useState([0, 200000]);

  // Estado do filtro de condição
  const [condicao, setCondicao] = useState([]);

  // Opções de condição do produto
  const opcoesCondicao = ["Novo", "Usado", "Semi-novo"];

  // Função para atualizar os filtros
  const aplicarFiltros = () => {
    setFilters({ preco, condicao });
  };

  return (
    <Box sx={{ width: 250, p: 2, bgcolor: "#212121", color: "white", height: "100vh" }}>
      <Typography variant="h6" gutterBottom>
        Filtros
      </Typography>

      {/* Slider de Preço */}
      <Typography variant="body1">Preço</Typography>
      <Slider
        value={preco}
        onChange={(e, novoValor) => setPreco(novoValor)}
        valueLabelDisplay="auto"
        min={0}
        max={200000}
        sx={{ color: "red" }}
      />
      <Typography variant="body2">
        R$ {preco[0]} - R$ {preco[1]}
      </Typography>

      {/* Filtro de Condição */}
      <Typography variant="body1" sx={{ mt: 2 }}>
        Condição
      </Typography>
      <FormGroup>
        {opcoesCondicao.map((item) => (
          <FormControlLabel
            key={item}
            control={
              <Checkbox
                checked={condicao.includes(item)}
                onChange={(e) => {
                  const novaCondicao = e.target.checked
                    ? [...condicao, item]
                    : condicao.filter((c) => c !== item);
                  setCondicao(novaCondicao);
                }}
                sx={{ color: "white" }}
              />
            }
            label={item}
          />
        ))}
      </FormGroup>

      {/* Botão Aplicar Filtros */}
      <Button
        variant="contained"
        color="secondary"
        sx={{ mt: 2, width: "100%", bgcolor: "red" }}
        onClick={aplicarFiltros}
      >
        Aplicar Filtros
      </Button>
    </Box>
  );
};

export default SidebarFiltros;
