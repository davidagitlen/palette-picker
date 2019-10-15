import React from 'react';
import '../Preview/Preview.css';
import profile from '../../images/profile.png';

const Preview = (props) => {
  const { projectName, paletteName, colors } = props;
  const header = colors.colors[0].hex_1;
  const title = colors.colors[1].hex_2;
  const border = `3px solid ${colors.colors[2].hex_3}`;
  const body = colors.colors[3].hex_4;
  const footer = colors.colors[4].hex_5;
  return (
    <div className="Preview">
      <div className="page">
        <header className="page-header" style={{ backgroundColor: header }}>
          {projectName || "Project Name"}
        </header>
        <div>
          <h4 className="page-title" style={{ color: title }}>
            {paletteName || "Palette Name"}
          </h4>
          <img
            className="page-profile"
            src={profile}
            alt="stock png"
            style={{ border: border }}
          />
          <p className="page-body" style={{ color: body }}>
            Lorem lean startup ipsum product market fit customer development
            acquihire technical cofounder. User engagement A/B testing shrink a
            market venture capital pitch deck.
          </p>
          <p className="page-body" style={{ color: body }}>
            Social bookmarking group buying crowded market pivot onboarding
            freemium prototype ping pong. Supply chain bandwidth holy grail
            disruptive series. Analytics burn rate entrepreneur beta hackathon
            agile development.
          </p>
          <p className="page-body" style={{ color: body }}>
            Tech virtual drone online browser platform through in a system. But
            stream software offline. Professor install angel sector anywhere
            create at components smart. Document fab developers encryption
            smartphone powered, bespoke blockstack edit atoms. Privacy news data
            policies analytics documents.
          </p>
        </div>
        <footer
          className="page-footer"
          style={{ backgroundColor: footer }}
        ></footer>
      </div>
    </div>
  );
}

export default Preview;