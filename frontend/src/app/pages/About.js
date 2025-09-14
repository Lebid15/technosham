import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function About(){
  const { i18n } = useTranslation();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    async function load(){
      try {
        const lang = i18n.language || 'en';
        const res = await fetch(`http://127.0.0.1:8000/api/about?lang=${lang}`, { signal: controller.signal });
        if(!res.ok) throw new Error('HTTP '+res.status);
        const json = await res.json();
        setTitle(json.title || 'About Technosham');
        setContent(json.content || '');
      } catch (e){
        if(e.name !== 'AbortError') setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => controller.abort();
  }, [i18n.language]);

  return (
    <div className="card">
      <div className="card-body">
        {loading && <p>Loading...</p>}
        {error && <p className="text-danger">Error: {error}</p>}
        {!loading && !error && (
          <>
            <h2 className="card-title">{title}</h2>
            <p className="card-text" style={{whiteSpace:'pre-line'}}>{content || 'No content yet.'}</p>
          </>
        )}
      </div>
    </div>
  );
}



