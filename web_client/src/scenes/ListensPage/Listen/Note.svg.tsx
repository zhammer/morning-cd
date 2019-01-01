import React from 'react';

function Note(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" {...props}>
      <g fillRule="evenodd" clipRule="evenodd">
        <path d="M34.383 38.354c-5.126.571-9.499.268-14.64.479-1.203.05-4.224-.206-4.8 1.2.664 2.07 3.847.489 4.56 1.92.297-.799 1.369-.509 1.2.24 4.245-.623 8.799.109 14.64-.96.389-.866-.041-1.162.239-1.92-.665-.052-.679-.759-1.199-.959z" />
        <path d="M56.942 37.635c-.418-9.195.511-21.092-.24-30.48-6.29-.791-11.019-.467-17.279-.72-.067-.486-1.899-.558-.721-.24.134-.001.272.194 0 .24-1.656.111-2.314.718-3.12-.72h-1.92c.738.709-2.404 1.174-.959 0h-.48c-.646.969-2.321-.294-2.88.96-.568-.232-.757-.843-1.44-.96h-.24c-.349.371-.936.504-1.68.48v-.48h-2.88c-2.45 1.062-6.084-.546-8.4 1.2-.477-.554.06-.267.24-.72-2.669.121-8.021-1.545-8.88 2.4v12.24c.682 11.843.162 22.95.24 35.52.538 1.062 2.143 1.057 3.36 1.439h.96c12.039-.601 19.256-.658 31.92-.72 2.987-2.667 5.464-5.735 8.399-8.64 1.816-1.797 5.194-3.692 6-6 .521-1.491.079-3.063 0-4.799zm-8.16 9.599c-.244-.156-.248-.552-.72-.48-.748 1.321-2.943 3.087-4.08 4.801-.513-3.041-.889-5.28-.96-8.4 4.347-.151 5.93-.231 10.32-.24-.796 2.162-3.386 2.533-4.56 4.319zm5.28-6.719c-2.477-.496-5.326-.068-7.44-.24-2.593-.211-5.478-.353-6.479 1.44.639 4.018.075 8.247.24 12.72-8.907.585-20.28.426-30.96.479-.63-13.97-.441-30.061-.48-45.84 5.637-.115 10.004.694 14.88.24.601-.041.751.369.96.72h.24c-.229-1.081 3.672.075 5.04-.72-.042.304-.243.45-.554.485 1.741.038 2.817.776 4.875-.245-.06.261-.478.163-.48.48.945-.001 2.521 0 3.601-.72-.021.34-.04.68.239.72 4.222-.16 9.334.39 13.2-.72.997.033.049.158 0 .48 1.073.527 2.282-.296 3.12.24-.113 9.874.748 19.56-.002 30.481z" />
        <path d="M38.223 15.074c-5.875.167-14.726.027-20.16-.24-1.487-.073-2.944-.199-3.12 1.44 1.501 1.811 5.425.222 6.72 1.68.853-.856 2.48-.409 2.4.24 1.439-.291 1.52 0 2.4-.72.616 1.499 4.51.227 5.52 0-.189.043-.277.209-.24.48 5.402.007 10.47-.482 16.56-.24.149-.981 1.002-.137.96-.96.619-.33.053-1.471 0-1.92-3.405-1.385-7.126.129-11.04.24zM19.502 22.994c-1.394 0-4.245-.777-4.56 1.2 2.057 1.485 3.532.867 6.48 1.2.001.241-.194.286-.24.48.888-.688 1.604-.1 2.64-.48-.608.926.506-.309.24.96 1.397-1.206 1.202.467 2.4-.96 1.103 1.247 4.508.645 5.28 0 2.843 1.252 6.085.119 9.36 0 .106-.004 3.757.479 3.84.48 2.316.04 3.446-.476 4.561-.96.074-.875-.039-1.562-.24-2.16-9.563-.405-17.647.24-29.761.24zM15.183 31.154c.054.454-.271.53-.24.96.013.307.308.333.24.72 3.893.492 5.479.969 8.4.72-.41.774.461.132.96.72.837-.927.245-.551.96 0 1.093-1.082 4.692.689 6.48-.96-.013.307-.308.332-.24.72 6.969-.543 12.799.03 17.52-.72.323-.725.323-1.916 0-2.64-9.138-.21-21.577.259-34.08.48zM30.542 46.034c-.614.88-1.29.281-1.44-.24-.849-.129-1.052.389-1.44.721-.316-1.245-2.492-.677-3.12 0-2.07-.841-6.5-.324-9.84.239-.348 1.214-.205 1.6.24 2.641 6.79.209 11.075-.49 19.68-.48.348-.601.582-.942.24-1.68-1.29-.786-3.934-.113-4.32-1.201z" />
      </g>
    </svg>
  );
}

export default Note;
