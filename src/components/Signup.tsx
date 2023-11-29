import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
  name:string;
  surname:string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name, surname
}) => (
  <div>

    <h1>Bienvenido/a, ¡{name}!</h1>
    <p> {name} {surname}, gracias por registrarte en RowONE. Estás a un paso de disfrutar
    de las mejores ofertas para ver a tus ídolos musicales a golpe de click. 
    Haz login en nuestra web y podrás descubrir cuándo tocan tus grupos favoritos en 
    tu ciudad y verles al mejor precio. 
    ¿A qué esperas? ¡Entra ya!  </p>
    <br></br>
    <br></br>
    
    <h1>Welcome, {name}!</h1>
    <p>{name} {surname}, thanks for signing up to RowONE. You're just one step away from 
    discovering the best offers to see your musical idols live! Simply log in to our website, 
    and you'll be able to find out when your favorite bands are performing in your city. 
    Experience them live at the best prices. 
    What are you waiting for?</p>
    <br></br>
    <a href="http://localhost:5713/login"></a>
  </div>
);