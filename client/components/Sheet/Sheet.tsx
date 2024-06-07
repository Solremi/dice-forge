import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios/axios';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './Sheet.scss';

interface Sheet {
    id: number;
    name: string;
    image: string;
    class: string;
    level: number;
}

function SheetInfo() {
    const [sheet, setSheet] = useState<Sheet | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axiosInstance.get('/api/sheet')
            .then(response => {
                setSheet(response.data);
            })
            .catch(error => {
                setError("Erreur lors de la récupération de la fiche, veuillez réessayer.");
            });
    }, []);

    return (
        <div>
            <Header />
            <h1>Fiche Personnage</h1>
            <div>
                {error ? (
                    <p>{error}</p>
                ) : (
                    sheet ? (
                        <div className="sheet">
                            <h2>{sheet.name}</h2>
                            <img src={sheet.image} alt={sheet.name} />
                            <p>Classe: {sheet.class}</p>
                            <p>Niveau: {sheet.level}</p>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )
                )}
            </div>
            <Footer />
        </div>
    );
}

export default SheetInfo;
