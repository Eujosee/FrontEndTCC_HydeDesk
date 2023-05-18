const data = [
  {
    titulo: "Hardware",
    exemplos: [
      {
        label: "Computador não liga:",
        texto:
          "Verificar as conexões de energia, testar a fonte de alimentação, verificar se há problemas com o botão de energia ou componentes defeituosos.",
      },
      {
        label: "Tela do computador está distorcida:",
        texto:
          "Verificar a conexão do cabo de vídeo, atualizar os drivers de vídeo, ajustar as configurações de resolução da tela.",
      },
      {
        label: "Impressora não imprime corretamente:",
        texto:
          "Verificar os cartuchos de tinta ou toner, limpar os cabeçotes de impressão, garantir que a impressora esteja configurada corretamente.",
      },
    ],
    img: "hardware",
  },
  {
    titulo: "Software",
    exemplos: [
      {
        label: "Crash:",
        texto:
          "Um dos tipos de erro mais comuns e por vezes mais perigosos que podem ocorrer em que o aplicativo para de funcionar.",
      },
      {
        label: "Buffer Overflow:",
        texto:
          "Quando o envio de dados para o sistema de gestão operacional é excessivo e além do limite, pode ocorrer o Buffer Overflow. O que é isso? É uma falha que pode prejudicar o software da empresa e o armazenamento de dados da mesma.",
      },
      {
        label: "Bugs com a segurança:",
        texto:
          "Quando o software de gestão não passar por manutenções preventivas, os dados dos colaboradores e clientes podem ficar expostos quando o sistema sofrer com bugs nos firewalls.",
      },
    ],
    img: "software",
  },
  {
    titulo: "Redes",
    exemplos: [
      {
        label: "Problemas nos cabos:",
        texto:
          "Conexões mal feitas podem comprometer a conectividade do equipamento na rede.",
      },
      {
        label: "Rede Wi-Fi não se conecta:",
        texto:
          "Sujeitos a problemas de segurança, como ataques de hackers ou malware.",
      },
      {
        label: "Placa de Rede Defeituosa:",
        texto:
          "Mesmo que você já tenha verificado os cabos e a rede wi-fi, mas ainda não consiga se conectar, é possível que o problema esteja na placa de rede.",
      },
    ],
    img: "redes",
  },
];

export default data;
