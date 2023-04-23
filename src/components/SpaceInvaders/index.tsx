import React, {useCallback, useEffect, useState} from 'react';

interface Position {
  x: number;
  y: number;
}

const SpaceInvaders: React.FC = () => {
  const [playerPosition, setPlayerPosition] = useState<number | null>(null);
  const [bulletPositions, setBulletPositions] = useState<Position[]>([]);
  const [alienPosition, setAlienPosition] = useState<Position>({x: 100, y: 50});
  const [gameOver, setGameOver] = useState<boolean>(false);

  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [lastBulletFiredAt, setLastBulletFiredAt] = useState<number>(0);

  const updatePlayerPosition = useCallback(() => {
    let newPosition = playerPosition ?? -30;

    if (pressedKeys.has("ArrowRight")) {
      newPosition = Math.min(newPosition + 5, window.innerWidth - 30);
    }
    if (pressedKeys.has("ArrowLeft") && newPosition >= -30) {
      newPosition = Math.max(newPosition - 5, -30);
    }

    setPlayerPosition(newPosition);

    requestAnimationFrame(updatePlayerPosition);
  }, [playerPosition, pressedKeys]);

  const handleKeyEvent = useCallback((e: globalThis.KeyboardEvent, eventType: 'down' | 'up') => {
    if (eventType === 'down') {
      setPressedKeys((prev) => new Set([...Array.from(prev), e.key]));

      if (!playerPosition) return;

      if (e.key === 'ArrowRight') {
        setPlayerPosition((prev) => Math.min((prev as number) + 30, window.innerWidth - 30));
      } else if (e.key === 'ArrowLeft') {
        setPlayerPosition((prev) => Math.max((prev as number) - 30, -30));
      } else if (e.key === ' ') {
        const now = performance.now();
        if (now - lastBulletFiredAt >= 100) {
          const bulletX = playerPosition + 15;
          setBulletPositions((prev) => [
            ...prev,
            {x: bulletX, y: window.innerHeight - 50},
          ]);
          setLastBulletFiredAt(now);
        }
      }
    } else {
      setPressedKeys((prev) => {
        prev.delete(e.key);
        return new Set([...Array.from(prev)]);
      });
    }
  }, [lastBulletFiredAt, playerPosition]);


  const resetGame = () => {
    setPlayerPosition(window.innerWidth / 2);
    setBulletPositions([]);
    setAlienPosition({x: 100, y: 50});
    setGameOver(false);
  };

  const updateBullets = useCallback(() => {
    setBulletPositions((prev) => {
      const newBullets = prev.filter((bullet) => bullet && bullet.y > 0);

      newBullets.forEach((bullet, index) => {
        if (
          bullet.y <= alienPosition.y + 30 &&
          bullet.y >= alienPosition.y &&
          bullet.x >= alienPosition.x &&
          bullet.x <= alienPosition.x + 60
        ) {
          setGameOver(true);
          delete newBullets[index];
        } else {
          newBullets[index] = {...bullet, y: bullet.y - 5};
        }
      });

      return newBullets;
    });

    if (!gameOver) {
      requestAnimationFrame(updateBullets);
    }
  }, [alienPosition.x, alienPosition.y, gameOver]);

  useEffect(() => {
    requestAnimationFrame(updatePlayerPosition);
  }, [updatePlayerPosition]);

  useEffect(() => {
    const updateInterval = setInterval(updatePlayerPosition, 1000 / 60);
    return () => clearInterval(updateInterval);
  }, [updatePlayerPosition]);

  useEffect(() => {
    if (playerPosition === null && typeof window !== 'undefined') {
      setPlayerPosition(window.innerWidth / 2);
    }
  }, [playerPosition]);

  useEffect(() => {
    const keyDownHandler = (e: globalThis.KeyboardEvent) => handleKeyEvent(e, 'down');
    const keyUpHandler = (e: globalThis.KeyboardEvent) => handleKeyEvent(e, 'up');

    document.addEventListener('keydown', keyDownHandler);
    document.addEventListener('keyup', keyUpHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
      document.removeEventListener('keyup', keyUpHandler);
    };
  }, [handleKeyEvent]);

  useEffect(() => {
    requestAnimationFrame(updateBullets);
  }, [updateBullets]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {gameOver ? (
        <div className="flex flex-col items-center justify-center">
          <h1>Game Over!</h1>
          <button className="border px-3 rounded" onClick={resetGame}>Restart</button>
        </div>
      ) : (
        <>
          {playerPosition !== null && (
            <div
              style={{
                position: 'absolute',
                left: playerPosition,
                bottom: 10,
                width: 62,
              }}
            >
              <svg width="60" height="30" xmlns="http://www.w3.org/2000/svg">
                <rect x="28" y="2" width="4" height="2" fill="#ffffff"/>
                <rect x="26" y="4" width="8" height="2" fill="#ffffff"/>
                <rect x="24" y="6" width="12" height="2" fill="#ffffff"/>
                <rect x="22" y="8" width="16" height="2" fill="#ffffff"/>
                <rect x="20" y="10" width="20" height="2" fill="#ffffff"/>
                <rect x="12" y="12" width="36" height="2" fill="#ffffff"/>
                <rect x="10" y="14" width="40" height="2" fill="#ffffff"/>
                <rect x="8" y="16" width="44" height="2" fill="#ffffff"/>
                <rect x="6" y="18" width="48" height="2" fill="#ffffff"/>
                <rect x="4" y="20" width="52" height="2" fill="#ffffff"/>
                <rect x="2" y="22" width="56" height="2" fill="#ffffff"/>
                <rect x="0" y="24" width="60" height="2" fill="#ffffff"/>
              </svg>
            </div>
          )}
          {bulletPositions.map((bullet, index) =>
            bullet ? (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  left: bullet.x + 14,
                  top: bullet.y,
                  width: 3,
                  height: 10,
                  backgroundColor: 'yellow',
                }}
              ></div>
            ) : null
          )}
          <div
            style={{
              position: 'absolute',
              left: alienPosition.x,
              top: alienPosition.y,
              width: 62,
            }}
          >
            <svg width="60" height="30" xmlns="http://www.w3.org/2000/svg">
              <rect x="28" y="26" width="4" height="2" fill="green"/>
              <rect x="26" y="24" width="8" height="2" fill="green"/>
              <rect x="24" y="22" width="12" height="2" fill="green"/>
              <rect x="22" y="20" width="16" height="2" fill="green"/>
              <rect x="20" y="18" width="20" height="2" fill="green"/>
              <rect x="12" y="16" width="36" height="2" fill="green"/>
              <rect x="10" y="14" width="40" height="2" fill="green"/>
              <rect x="8" y="12" width="44" height="2" fill="green"/>
              <rect x="6" y="10" width="48" height="2" fill="green"/>
              <rect x="4" y="8" width="52" height="2" fill="green"/>
              <rect x="2" y="6" width="56" height="2" fill="green"/>
              <rect x="0" y="4" width="60" height="2" fill="green"/>
            </svg>
          </div>
        </>
      )}
    </div>
  );
};

export default SpaceInvaders;
