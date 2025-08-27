"use client";
import { FC } from 'react';

const GlobalStyles: FC = () => (
    <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

    @keyframes card-intro {
      from { opacity: 0; transform: perspective(1000px) rotateX(-20deg) scale(0.9); }
      to { opacity: 1; transform: perspective(1000px) rotateX(0deg) scale(1); }
    }
    @keyframes slide-in-up {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* --- Form Styles --- */
    .form-group { position: relative; }
    .form-input {
      background: transparent; border: none; border-bottom: 1px solid #ffffff50;
      transition: all 0.3s ease; padding: 0.75rem 0.25rem;
      font-size: 1rem; color: #fff;
    }
    .form-input:focus { outline: none; border-bottom-color: #8ab4f8; }
    .form-label {
      position: absolute; top: 50%; left: 0.25rem; transform: translateY(-50%);
      color: #a0aec0; transition: all 0.2s ease; pointer-events: none;
    }
    .form-input:focus + .form-label,
    .form-input:not(:placeholder-shown) + .form-label {
      top: -0.5rem; font-size: 0.75rem; color: #8ab4f8;
    }

    .plexus-button {
      background: #8ab4f820; color: #8ab4f8; border: 1px solid #8ab4f8;
      transition: all 0.3s ease; position: relative; overflow: hidden;
    }
    .plexus-button:hover {
      background: #8ab4f8; color: #11111b; box-shadow: 0 0 20px #8ab4f880;
    }
  `}</style>
);
export default GlobalStyles;
