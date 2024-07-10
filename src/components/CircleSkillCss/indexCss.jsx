import React, { useEffect, useState } from 'react';
import './CircleSkillCss.css';

const CircleSkillBarCss = ({percentage}) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        //Fonction pour le remplissage progressif
        const fillProgress = () => {
            let currentProgress = 0;
            const targetProgress = percentage; 
            const animationDuration = 2000; //2 secondes
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
        const restartAnimation = () => {
            const restartInterval = setInterval(() => {
                setProgress(0); // Réinitialise le progrès à 0
                fillProgress(); // Redémarre l'animation
            }, 15000); // Toutes les 15 secondes

            return () => clearInterval(restartInterval);
        };
        //Appels de la fonction de remplissage progressif au chargement de la page //
        fillProgress();
        restartAnimation();
    }, [percentage]);

    const circleStyle = {
        background: `conic-gradient(#008cff ${progress}%, #ccc ${progress}%)`,
    };
    //Rounded progress, pas de décimals
    return (
        <div className="circular-skill-bar">
            <h3 className="titre-skill">CSS-Sass</h3>
            <div className="circle-background">
                <div className="circle-progress" style={circleStyle}></div>
                <div className="percentage-text">{`${Math.round(progress)}%`}</div>
            </div>
        </div>
    );
};

export default CircleSkillBarCss;