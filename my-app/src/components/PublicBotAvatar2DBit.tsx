export type BotStatus =
  | "neutral"
  | "speaking"
  | "thinking"
  | "listening"
  | "computing";

export default function PublicBotAvatar2DBit({
  status = "neutral",
  size = 44,
}: {
  status?: BotStatus;
  size?: number;
}) {
  return (
    <>
      <div
        className="fg-public-bot-wrap"
        style={{
          width: size,
          height: size,
          flexShrink: 0,
        }}
      >
        <div
          className={`fg-public-bot ${status || "neutral"}`}
        >
          <div className="fg-public-bot-head">
            <div className="fg-public-bot-left-ear">
              <div className="fg-public-bot-left-ear-inner" />
            </div>

            <div className="fg-public-bot-face">
              <div className="fg-public-bot-eyes">
                <div className="fg-public-bot-left-eye" />
                <div className="fg-public-bot-right-eye" />
              </div>
              <div className="fg-public-bot-mouth" />
            </div>

            <div className="fg-public-bot-right-ear">
              <div className="fg-public-bot-right-ear-inner" />
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          .fg-public-bot-wrap {
            position: relative;
            overflow: visible;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .fg-public-bot {
            position: relative;
            width: 100%;
            height: 100%;
          }

          .fg-public-bot-head {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 96%;
            height: 94%;
          }

          .fg-public-bot-face {
            position: absolute;
            inset: 0;
            border: 0.4em solid #D97706;
            border-radius: 1.5em;
            background: linear-gradient(
              180deg,
              #FEF3C7,
              #FDE68A
            );
            box-shadow:
              inset 0 0 15px rgba(255,255,255,0.8),
              0 0 20px rgba(245, 197, 66, 0.15);
          }
          html.light .fg-public-bot-face {
            background: linear-gradient(180deg, #FFFBEB, #FEF3C7);
            border-color: #F59E0B;
          }

          .fg-public-bot-left-ear,
          .fg-public-bot-right-ear {
            position: absolute;
            top: 30%;
            width: 6%;
            height: 25%;
            border: 0.15em solid #B45309;
            background-color: #F59E0B;
            border-radius: 0.1em;
          }

          .fg-public-bot-left-ear {
            left: -6%;
          }

          .fg-public-bot-right-ear {
            right: -6%;
          }

          .fg-public-bot-left-ear-inner,
          .fg-public-bot-right-ear-inner {
            position: absolute;
            top: 20%;
            width: 100%;
            height: 60%;
            background-color: #f5c542;
            border-radius: 0.1em;
            box-shadow: 0 0 10px rgba(245, 197, 66, 0.3);
          }

          .fg-public-bot-left-ear-inner {
            left: -150%;
          }

          .fg-public-bot-right-ear-inner {
            right: -150%;
          }

          .fg-public-bot-eyes {
            position: absolute;
            width: 70%;
            height: 20%;
            margin-left: 16%;
            margin-top: 20%;
          }

          .fg-public-bot-left-eye,
          .fg-public-bot-right-eye {
            position: absolute;
            width: 35%;
            height: 100%;
            background: linear-gradient(180deg, #F59E0B, #B45309);
            border-radius: 0.5em;
            box-shadow: 0 0 14px rgba(245,197,66,0.3);
          }

          .fg-public-bot-right-eye {
            right: 0%;
          }

          .fg-public-bot-mouth {
            position: absolute;
            width: 30%;
            height: 4%;
            border-left: 0.2em solid #B45309;
            border-right: 0.2em solid #B45309;
            border-bottom: 0.2em solid #B45309;
            border-top: 0;
            border-radius: 0.5em;
            left: 35%;
            bottom: 20%;
            opacity: 0.9;
          }

          .fg-public-bot.neutral .fg-public-bot-left-eye,
          .fg-public-bot.neutral .fg-public-bot-right-eye {
            animation: fg-public-bot-blink-eyes 4s infinite;
            animation-delay: 2s;
          }

          .fg-public-bot.neutral .fg-public-bot-left-ear-inner {
            animation: fg-public-bot-move-left-ear-inner 5s infinite ease alternate;
          }

          .fg-public-bot.neutral .fg-public-bot-right-ear-inner {
            animation: fg-public-bot-move-right-ear-inner 5s infinite ease alternate;
          }

          @keyframes fg-public-bot-blink-eyes {
            0%, 90%, 100% { height: 100%; margin-top: 0%; transform: scaleY(1); }
            95% { height: 100%; margin-top: 0%; transform: scaleY(0.1); }
          }

          .fg-public-bot.speaking .fg-public-bot-mouth {
            border-top: 0.2em solid #f5c542;
            background-color: rgba(245, 197, 66, 0.2);
            box-shadow: 0 0 15px rgba(245, 197, 66, 0.4);
            animation: fg-public-bot-speak-mouth 1s infinite ease alternate;
          }

          @keyframes fg-public-bot-speak-mouth {
            0%, 100% { width: 30%; height: 4%; left: 35%; transform: scaleY(1); }
            25% { width: 34%; height: 12%; left: 33%; transform: scaleY(1.2); }
            50% { width: 26%; height: 8%; left: 37%; transform: scaleY(0.8); }
            75% { width: 32%; height: 10%; left: 34%; transform: scaleY(1.1); }
          }

          .fg-public-bot.thinking .fg-public-bot-eyes {
            animation: fg-public-bot-glance-eyes 8s infinite ease-in-out;
            animation-delay: 0.8s;
          }

          .fg-public-bot.thinking .fg-public-bot-mouth {
            animation: fg-public-bot-pinch-mouth 6s infinite ease alternate;
            animation-delay: 1.2s;
          }

          .fg-public-bot.thinking .fg-public-bot-left-ear-inner {
            animation: fg-public-bot-move-left-ear-inner 6s infinite ease alternate;
            animation-delay: 1s;
          }

          .fg-public-bot.thinking .fg-public-bot-right-ear-inner {
            animation: fg-public-bot-move-right-ear-inner 6s infinite ease alternate;
            animation-delay: 1s;
          }

          @keyframes fg-public-bot-glance-eyes {
            0%, 100% { margin-left: 16%; }
            20%, 45% { margin-left: 8%; }
            55%, 80% { margin-left: 24%; }
          }

          @keyframes fg-public-bot-pinch-mouth {
            0% { width: 30%; left: 35%; }
            48% { width: 30%; left: 35%; }
            50% { width: 10%; left: 45%; }
            52% { width: 30%; left: 35%; }
            100% { width: 30%; left: 35%; }
          }

          @keyframes fg-public-bot-move-left-ear-inner {
            0% { left: -150%; }
            48% { left: -150%; }
            50% { left: -100%; }
            52% { left: -150%; }
            100% { left: -150%; }
          }

          @keyframes fg-public-bot-move-right-ear-inner {
            0% { right: -150%; }
            48% { right: -150%; }
            50% { right: -100%; }
            52% { right: -150%; }
            100% { right: -150%; }
          }

          .fg-public-bot.listening .fg-public-bot-left-eye,
          .fg-public-bot.listening .fg-public-bot-right-eye {
            background: linear-gradient(180deg, var(--fluke-yellow), #b45309);
            border-radius: 1em;
            transition: border-radius 0.25s linear;
            animation: none;
            box-shadow: 0 0 14px rgba(245, 197, 66, 0.4);
          }

          .fg-public-bot.listening .fg-public-bot-left-ear,
          .fg-public-bot.listening .fg-public-bot-right-ear,
          .fg-public-bot.listening .fg-public-bot-left-ear-inner,
          .fg-public-bot.listening .fg-public-bot-right-ear-inner {
            background-color: var(--fluke-yellow);
          }

          .fg-public-bot.listening .fg-public-bot-face,
          .fg-public-bot.listening .fg-public-bot-left-ear,
          .fg-public-bot.listening .fg-public-bot-right-ear {
            border-color: var(--fluke-yellow);
            transition: border-color 0.25s linear;
          }

          .fg-public-bot.listening .fg-public-bot-left-ear-inner,
          .fg-public-bot.listening .fg-public-bot-right-ear-inner {
            animation: fg-public-bot-border-bump 0.4s infinite ease alternate;
            animation-delay: 0.5s;
          }

          @keyframes fg-public-bot-border-bump {
            0% {
              outline: 0.4em dotted var(--fluke-yellow);
            }
            100% {
              outline: 0.2em dotted transparent;
            }
          }

          .fg-public-bot.computing .fg-public-bot-left-eye,
          .fg-public-bot.computing .fg-public-bot-right-eye {
            height: 100%;
            width: 25%;
            border-radius: 100%;
            transition: all 0.25s linear;
            border: 0.3em dashed #92400e;
            animation-delay: 0.5s;
            background: linear-gradient(180deg, #ffffff, #fcd34d);
          }

          .fg-public-bot.computing .fg-public-bot-left-eye {
            animation: fg-public-bot-border-dance 1s infinite linear;
          }

          .fg-public-bot.computing .fg-public-bot-right-eye {
            animation: fg-public-bot-border-dance 1s infinite linear;
          }

          .fg-public-bot.computing .fg-public-bot-face,
          .fg-public-bot.computing .fg-public-bot-left-ear,
          .fg-public-bot.computing .fg-public-bot-right-ear,
          .fg-public-bot.computing .fg-public-bot-left-ear-inner,
          .fg-public-bot.computing .fg-public-bot-right-ear-inner {
            border-color: #f5c542;
            transition: border-color 0.25s linear;
          }

          .fg-public-bot.computing .fg-public-bot-left-ear,
          .fg-public-bot.computing .fg-public-bot-right-ear,
          .fg-public-bot.computing .fg-public-bot-left-ear-inner,
          .fg-public-bot.computing .fg-public-bot-right-ear-inner {
            background-color: var(--fluke-yellow);
            animation: none;
          }

          .fg-public-bot.computing .fg-public-bot-mouth {
            border: 0.5em solid #f5c542;
            width: 10%;
            left: 45%;
          }

          @keyframes fg-public-bot-border-dance {
            100% {
              transform: rotateZ(360deg);
            }
          }
        `}
      </style>
    </>
  );
}
