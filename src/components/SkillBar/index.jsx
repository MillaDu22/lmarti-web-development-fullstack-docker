import React, { useEffect, useState } from 'react';
import "./SkillBar.css";

const SkillBar = ({ skillName, percentage }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const fillProgress = () => {
            let currentProgress = 0;
            const targetProgress = percentage;
            const animationDuration = 2000; // 2 secondes
            const increment = (targetProgress / animationDuration) * 10;
            const interval = setInterval(() => {
                currentProgress += increment;
                if (currentProgress >= targetProgress) {
                    currentProgress = targetProgress;
                    clearInterval(interval);
                }
                setProgress(currentProgress);
            }, 10);
        };
        fillProgress(); // Appel initial du remplissage progressif
        const restartAnimation = () => {
            const restartInterval = setInterval(() => {
                setProgress(0); // Réinitialise la progrèss à 0
                fillProgress(); // Redémarre l'animation
            }, 15000); // Toutes les 15 secondes
            return () => clearInterval(restartInterval);
        };
        restartAnimation(); // Appel initial du redémarrage de l'animation
    }, [percentage]);

    return (
        <div className="skill">
            <div className="skill-name">{skillName}</div>
            <div className="skill-bar">
                <div className="skill-level" style={{ width: `${progress}%` }}>
                    {Math.round(progress)}%
                </div>
            </div>
        </div>
    );
};

export default SkillBar;
