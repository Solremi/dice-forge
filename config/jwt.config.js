const jwtConfig = {
    secretKey: process.env.JWT_SECRET,
    options: {
        algorithm: 'HS256', 
        accessExpiresIn: '15m', 
        refreshExpiresIn: '1d'
    }
};

export default jwtConfig;

