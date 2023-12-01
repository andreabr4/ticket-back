import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
  name: string;
  surname: string;
}

export const EmailTemplatePurchase: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  surname,
}) => (
  <div>
  
    <h1> ¡Gracias por confiar en nosotro/as, {name}!</h1>
    <p>
      {' '}
      {name} {surname}, en este email encontrarás adjuntada tu entrada al
      concierto. Podrás llevar tu entrada tanto de forma digital en tu móvil
      como impresa si lo deseas y recuerda que en este tipo de eventos es
      recomendable acudir con al menos media hora de antelación para evitar
      problemas al acceder al recinto. 
      ¡Esperamos que disfrutes de esta experiencia y que vuelvas a confiar en nuestra web pronto!
    </p>
    <br></br>
    <br></br>

    <h1>Thank you for trusting us, {name}!</h1>
    <p>
      {name} {surname}, you will find your concert ticket attached in this
      email. You can bring your ticket either digitally on your mobile phone or
      printed. Remember that for this kind of events it is advisable to arrive
      at least half an hour early to avoid problems when accessing the venue. 
      We hope you enjoy this experience and that you will trust our website again
      soon!
    </p>
    <br></br>

    <a href="https://cool-klepon-45dc29.netlify.app/"></a>
  </div>
);
