"use client";

import { FC } from "react";

const GlobalStyles: FC = () => (
    <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap');

    body {
        border: 5px solid red !important;
      }

    /* --- Animations --- */
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

    @keyframes glitch-effect {
      0% { clip-path: inset(80% -6px 1% 0); transform: translate(-5px, 0); }
      10% { clip-path: inset(40% -6px 58% 0); transform: translate(5px, 0); }
      20% { clip-path: inset(10% -6px 85% 0); transform: translate(-3px, 0); }
      30% { clip-path: inset(50% -6px 30% 0); transform: translate(3px, 0); }
      40% { clip-path: inset(25% -6px 70% 0); transform: translate(-4px, 0); }
      50% { clip-path: inset(5% -6px 90% 0); transform: translate(4px, 0); }
      60% { clip-path: inset(70% -6px 25% 0); transform: translate(-2px, 0); }
      70% { clip-path: inset(30% -6px 60% 0); transform: translate(2px, 0); }
      80% { clip-path: inset(90% -6px 5% 0); transform: translate(-5px, 0); }
      90% { clip-path: inset(15% -6px 80% 0); transform: translate(5px, 0); }
      100% { clip-path: inset(60% -6px 35% 0); transform: translate(0); }
    }

    /* --- Glitch Heading --- */
    .glitch-heading {
      position: relative;
      color: #e2e8f0;
    }
    .glitch-heading::before,
    .glitch-heading::after {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #0a0a10;
      overflow: hidden;
    }
    .glitch-heading::before {
      left: 2px;
      text-shadow: -2px 0 #DB4437;
      animation: glitch-effect 2s infinite linear alternate-reverse;
    }
    .glitch-heading::after {
      left: -2px;
      text-shadow: -2px 0 #F4B400, 2px 0 #4285F4;
      animation: glitch-effect 3s infinite linear alternate-reverse;
    }

    /* --- Hologram Card & Form --- */
    .hologram-card {
      position: relative;
      background: radial-gradient(circle at center, rgba(10, 25, 47, 0.8) 0%, rgba(10, 25, 47, 0.95) 100%);
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

    /* Optional: step-based hiding for non-active fields */
    .field-hidden { display: none; }
    @keyframes fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
      }

    /* Custom select dropdown arrow */
    .custom-select {
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23F4B400' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
      background-position: right 0.5rem center;
      background-repeat: no-repeat;
      background-size: 1.5em 1.5em;
      padding-right: 2.5rem;
    }
  `}</style>
);

export default GlobalStyles;
