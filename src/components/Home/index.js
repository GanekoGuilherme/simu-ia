import React, { useState, useEffect } from 'react';
import './index.css'; // Certifique-se de ter um arquivo de estilo

const TypingEffect = ({ messages }) => {
  const [displayIndex, setDisplayIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let currentText = '';
    let index = 0;
    let intervalId;

    const startTyping = () => {
      intervalId = setInterval(() => {
        if (index <= messages[displayIndex].length) {
          currentText = messages[displayIndex].slice(0, index);
          setDisplayText(currentText);
          index += 1;
        } else {
          clearInterval(intervalId);
          setTimeout(() => {
            setDisplayText('');
            index = 0;
            setDisplayIndex((prevIndex) => (prevIndex + 1) % messages.length);
          }, 1000); // Aguarde 1 segundo antes de apagar e exibir a próxima mensagem
        }
      }, 70); // Ajuste a velocidade da datilografia conforme necessário
    };

    startTyping();

    return () => clearInterval(intervalId);
  }, [messages, displayIndex]);

  return <p>{displayText}</p>;
};

const Home = () => {
  const messages = [
    'Aprenda a teoria 📖',
    'Simule os procedimentos 📈',
    'Busque conhecimento 👽',
  ];

  return (
    <div className='home'>
      <h1>Simu.IA</h1>
      <TypingEffect messages={messages} />
    </div>
  );
};

export default Home;