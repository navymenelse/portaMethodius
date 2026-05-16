import { useState, useEffect, useRef } from 'react';
import init, { ConversationAgent } from '../wasm-agent-pkg/wasm_agent';

// Singleton global para evitar que React cree múltiples instancias en modo desarrollo (Strict Mode)
let globalAgent = null;
let wasmInitialized = false;

export const useWasm = () => {
  const [loading, setLoading] = useState(!wasmInitialized || !globalAgent);
  const [error, setError] = useState(null);
  const agentRef = useRef(globalAgent);

  useEffect(() => {
    if (wasmInitialized && globalAgent) {
      setLoading(false);
      return;
    }

    const loadWasm = async () => {
      console.log("Iniciando carga única de WASM...");
      try {
        if (!wasmInitialized) {
          await init();
          wasmInitialized = true;
        }
        
        if (!globalAgent) {
          globalAgent = new ConversationAgent();
          agentRef.current = globalAgent;
        }
        
        setLoading(false);
        console.log("WASM y Agente Global listos.");
      } catch (err) {
        console.error('Error crítico cargando WASM:', err);
        setError(err);
        setLoading(false);
      }
    };

    loadWasm();
  }, []);

  return { agentRef, loading, error };
};
