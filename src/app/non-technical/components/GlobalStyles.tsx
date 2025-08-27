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
    select.form-input {
      background-color: #11111b; /* A solid, dark background color */

      /* This adds a custom arrow since 'appearance-none' is used */
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23a0aec0' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
      background-position: right 0.5rem center;
      background-repeat: no-repeat;
      background-size: 1.5em 1.5em;
      padding-right: 2.5rem;
    }
    .form-input:focus + .form-label,
    .form-input:not(:placeholder-shown) + .form-label {
      top: -0.5rem; font-size: 0.75rem; color: #8ab4f8;
    }

    @keyframes slide-in-up {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pop-in-card {
        0% { opacity: 0; transform: scale(0.8); }
        80% { opacity: 1; transform: scale(1.05); }
        100% { opacity: 1; transform: scale(1); }
      }
      @keyframes draw-tick-gpay {
        to { stroke-dashoffset: 0; }
      }
      @keyframes scale-down-final {
        to { transform: scale(0.95); }
      }
      @keyframes slide-in-up {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }

      /* --- Classes for the Tick SVG --- */
      .tick-svg-container {
        animation: pop-in-card 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards, scale-down-final 0.3s ease-out 1s forwards;
        opacity: 0;
      }
      .tick-path {
        stroke: #fff;
        stroke-dasharray: 50;
        stroke-dashoffset: 50;
        animation: draw-tick-gpay 0.4s ease-out 0.5s forwards;
      }
      .hologram-card {
              position: relative;
              /* This creates the glassmorphic effect */
              background: rgba(255, 255, 255, 0.03); /* 97% transparent white */
              backdrop-filter: blur(12px);
              -webkit-backdrop-filter: blur(12px); /* For Safari support */
             
              padding: 2px;
              border-radius: 0.5rem;
              overflow: hidden;
            }
      .hologram-card::before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        border-radius: inherit;
        padding: 2px;
        background: linear-gradient(90deg, #4285F4, #DB4437, #F4B400, #0F9D58, #4285F4);
        background-size: 400% 400%;
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        animation: gradient-sweep 4s linear infinite;
      }

      .hologram-input {
        background: transparent;
        border: none;
        border-bottom: 2px solid #5f636880;
        font-family: 'Roboto Mono', monospace;
        caret-color: #81c995;
        transition: border-color 0.3s ease, box-shadow 0.3s ease;
      }
      .hologram-input:focus { outline: none; }
      .hologram-select-bg {
        background-color: #0a0a10;
      }
      select.form-input, select.hologram-input {
        background-color: #11111b; /* A solid, dark color similar to your theme */
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23a0aec0' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
        background-position: right 0.5rem center;
        background-repeat: no-repeat;
        background-size: 1.5em 1.5em;
        padding-right: 2.5rem;
      }

      /* Add these styles to your existing file */
  .hud-button-success {
    background: transparent; border: 2px solid #4285F4; color: #4285F4;
    transition: all 0.3s ease;
  }
  .hud-button-success:hover {
    background: #4285F4; color: #fff; box-shadow: 0 0 20px #4285F4;
  }
  .hud-button-failure {
    background: transparent; border: 2px solid #DB4437; color: #DB4437;
    transition: all 0.3s ease;
  }
  .hud-button-failure:hover {
    background: #DB4437; color: #fff; box-shadow: 0 0 20px #DB4437;
  }

      .hologram-button {
        background: transparent;
        border: 2px solid #4285F4;
        color: #4285F4;
        transition: all 0.3s ease;
      }
      .hologram-button:hover {
        background: #4285F4;
        color: #fff;
        box-shadow: 0 0 20px #4285F4;
      }



    @keyframes reveal-mask {
      0% { transform: scaleX(0); transform-origin: left; }
      45% { transform: scaleX(1); transform-origin: left; }
      55% { transform: scaleX(1); transform-origin: right; }
      100% { transform: scaleX(0); transform-origin: right; }
    }
    @keyframes pop-in-card {
        0% { opacity: 0; transform: scale(0.8); }
        80% { opacity: 1; transform: scale(1.05); }
        100% { opacity: 1; transform: scale(1); }
      }

      @keyframes draw-tick-gpay {
        to { stroke-dashoffset: 0; }
      }

      @keyframes scale-down-final {
        to { transform: scale(0.95); }
      }

      @keyframes slide-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
      }

      /* --- Classes for the Tick SVG --- */
      .tick-svg-container {
        /* This class applies the main pop-in animation */
        animation: pop-in-card 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards, scale-down-final 0.3s ease-out 1s forwards;
        opacity: 0;
      }

      .tick-path {
        stroke: #fff;
        stroke-dasharray: 50;
        stroke-dashoffset: 50;
        /* This class applies the drawing animation to the tick itself */
        animation: draw-tick-gpay 0.4s ease-out 0.5s forwards;
      }


    @keyframes reveal-content {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }

    @keyframes gradient-sweep {
      0% { background-position: 0% 50%; }
      100% { background-position: 200% 50%; }
    }

    .hud-button-success {
      background: transparent; border: 2px solid #4285F4; color: #4285F4;
      transition: all 0.3s ease;
    }
    .hud-button-success:hover {
      background: #4285F4; color: #fff; box-shadow: 0 0 20px #4285F4;
    }
    .hud-button-failure {
      background: transparent; border: 2px solid #DB4437; color: #DB4437;
      transition: all 0.3s ease;
    }
    .hud-button-failure:hover {
      background: #DB4437; color: #fff; box-shadow: 0 0 20px #DB4437;
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
