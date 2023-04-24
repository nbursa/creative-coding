import React, {useCallback, useEffect, useState} from 'react';
import {Alien, Bullet, GameOver, Player} from "./components";

interface Position {
  x: number;
  y: number;
}

const SpaceInvaders: React.FC = () => {
  const [playerPosition, setPlayerPosition] = useState<number | null>(window.innerWidth / 2 - 31);
  const [bulletPositions, setBulletPositions] = useState<Position[]>([]);
  const [alienPositions, setAlienPositions] = useState<Position[]>([{x: 100, y: 0}, {x: 200, y: 0}, {x: 300, y: 0}]);
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

      console.log("e.key: ", e.key, gameOver)
      if (e.key === 'Enter' && gameOver) {
        resetGame()
      }

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
    setPlayerPosition(window.innerWidth / 2 - 31);
    setBulletPositions([]);
    setAlienPositions([{x: 100, y: 0}, {x: 200, y: 0}, {x: 300, y: 0}]);
    setGameOver(false);
  };

  const updateBullets = useCallback(() => {
    setBulletPositions((prev) => {
      const newBullets = prev.filter((bullet) => bullet && bullet.y > 0);

      newBullets.forEach((bullet, bulletIndex) => {
        let bulletHit = false;

        alienPositions.forEach((alien, alienIndex) => {
          if (
            bullet.y <= alien.y + 30 &&
            bullet.y >= alien.y &&
            bullet.x >= alien.x &&
            bullet.x <= alien.x + 62
          ) {
            bulletHit = true;
            delete newBullets[bulletIndex];
            delete alienPositions[alienIndex];
          }
        });

        if (!bulletHit) {
          newBullets[bulletIndex] = {...bullet, y: bullet.y - 5};
        }
      });

      const remainingAliens = alienPositions.filter((alien) => alien);
      if (remainingAliens.length === 0) {
        setGameOver(true);
      }

      return newBullets;
    });

    if (!gameOver) {
      requestAnimationFrame(updateBullets);
    }
  }, [alienPositions, gameOver]);

  useEffect(() => {
    requestAnimationFrame(updatePlayerPosition);
  }, [updatePlayerPosition]);

  useEffect(() => {
    const updateInterval = setInterval(updatePlayerPosition, 1000 / 60);
    return () => clearInterval(updateInterval);
  }, [updatePlayerPosition]);

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
        <GameOver onRestart={resetGame}/>
      ) : (
        <>
          {playerPosition && (
            <Player position={playerPosition}/>
          )}
          {bulletPositions.map((bullet, index) =>
            bullet && <Bullet key={index} position={bullet}/>
          )}
          {alienPositions.map((alien, index) =>
            alien && <Alien key={index} position={alien}/>
          )}
        </>
      )}
    </div>
  );
};

export default SpaceInvaders;
