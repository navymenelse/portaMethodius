import { useState, useRef, useEffect } from 'react';
import init, { process_conversation } from '../../wasm-agent-pkg/wasm_agent';
import styles from './ChatWidget.module.css';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [chatState, setChatState] = useState({
    state_id: 0,
    name: '',
    company: '',
    pain_point: ''
  });
  const [isWasmReady, setIsWasmReady] = useState(false);
  
  const scrollRef = useRef(null);
  const processingRef = useRef(false);

  useEffect(() => {
    const loadWasm = async () => {
      try {
        await init();
        setIsWasmReady(true);
      } catch (e) {
        console.error("Error cargando WASM:", e);
      }
    };
    loadWasm();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (processingRef.current || !inputValue.trim() || !isWasmReady) return;

    processingRef.current = true;
    const userMessage = { text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);

    try {
      // Llamada a la función pura de Rust
      const stateJson = JSON.stringify(chatState);
      const outputJson = process_conversation(stateJson, inputValue);
      const output = JSON.parse(outputJson);
      
      // Actualizamos el estado en JS
      setChatState(output.new_state);
      
      // Si el nuevo estado es de redirección (4), enviamos el lead al backend
      if (output.new_state.state_id === 4) {
        fetch('http://localhost:3000/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: output.new_state.name,
            company: output.new_state.company,
            pain_point: output.new_state.pain_point
          })
        }).catch(err => console.error("Error persistiendo lead:", err));
      }
      
      // Añadimos el mensaje de respuesta
      setMessages(prev => [...prev, { 
        text: output.response_text, 
        sender: 'agent',
        link: output.whatsapp_link 
      }]);

    } catch (e) {
      console.error("Error en la conversación:", e);
    } finally {
      processingRef.current = false;
      setInputValue('');
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 0 && isWasmReady) {
      // Saludo inicial usando la lógica de Rust
      const stateJson = JSON.stringify(chatState);
      const outputJson = process_conversation(stateJson, "hola");
      const output = JSON.parse(outputJson);
      
      setChatState(output.new_state);
      setMessages([{ text: output.response_text, sender: 'agent' }]);
    }
  };

  return (
    <div className={styles.wrapper}>
      {isOpen && (
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.status}>
              <div className={styles.avatar}>M</div>
              <div>
                <h4>Methodius Agent</h4>
                <span>Online</span>
              </div>
            </div>
            <button onClick={toggleChat} className={styles.close}>×</button>
          </div>
          
          <div className={styles.messages} ref={scrollRef}>
            {messages.map((msg, i) => (
              <div key={i} className={`${styles.bubble} ${styles[msg.sender]}`}>
                {msg.text}
                {msg.link && (
                  <a href={msg.link} target="_blank" rel="noopener noreferrer" className={styles.waButton}>
                    Abrir WhatsApp
                  </a>
                )}
              </div>
            ))}
            {!isWasmReady && <div className={styles.loading}>Iniciando asistente...</div>}
          </div>

          <div className={styles.footer}>
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Escribe un mensaje..."
              className={styles.input}
              disabled={!isWasmReady}
            />
            <button onClick={handleSend} className={styles.send} disabled={!isWasmReady}>Send</button>
          </div>
        </div>
      )}

      <button onClick={toggleChat} className={styles.toggle}>
        {isOpen ? '×' : '💬'}
      </button>
    </div>
  );
};

export default ChatWidget;
