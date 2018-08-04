import React from 'react';

const SvgSun = props => (
  <svg viewBox='0 0 64 64' {...props}>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M30.976 14.456c1.574 1.7 2.693-.664 3.359-1.2-.714-2.282-.257-4.187-.96-6.48-.447-.033-.802-.158-.959-.48h-.72c-2.293 1.768-.147 4.718-.72 8.16zM21.135 20.695c.739-3.102-3.961-7.294-6-4.56 1.364 2.332 3.881 5.088 6 4.56zM48.735 16.375c-2.222-1.935-6.23.222-5.52 3.84 2.89 2.223 4.524-2.698 5.52-3.84zM14.896 31.255c-2.715-1.331-6.489-2.504-8.64.48v.48c1.096 2.668 6.13.727 8.64.48v-1.44zM56.896 31.496c-2.095-1.869-8.591-3.019-8.4 1.44.847.814 9.112 1.114 8.4-1.44zM42.976 43.256c-.14.899-.023.881-.48 1.68 1.606 1.593 3.091 4.32 5.761 4.08.919-2.981-2.586-5.578-5.281-5.76zM19.936 43.735c-1.077.472-2.527-.008-3.36.48-2.056 1.203-2.697 5.096 0 5.04 1.661-.035 3.125-3.539 3.84-4.801-.338-.061-.274-.525-.48-.719zM32.896 49.256c-4.685-1.289-2.889 4.8-1.92 8.159 4.422.635 1.447-4.5 1.92-8.159zM43.216 39.176c6.823-10.346-5.131-25.164-17.521-18.96-.135-1.24-.206.624-.96.24.001-.133-.194-.272-.24 0 .078.226-1.082 1.801-2.16.96-.637.427.083 1.905-.72.96-.729 1.917-2.975 3.514-3.12 6-.049.83.826 2.046-.24 1.44-2.318 10.938 11.654 20.06 21.12 13.68.603-.438.527-1.553 1.681-1.439.338-1.611 1.522-1.915 2.16-2.881zm-13.201 3.599c-.797-.563-1.561-1.158-2.88-1.2-.067-.388.227-.413.24-.72-.988.566-1.571-.888-2.16-.72.759-.775-.439-1.543-1.68-1.92.149-1.466-.915-3.219-1.92-4.32.998-.681.135-1.825.24-2.88.963-9.682 12.077-11.951 18.72-6 5.729 7.973-.888 20.085-10.56 17.76z'
    />
    <circle cx='50.5%' cy='50.5%' r={11} />
  </svg>
);

export default SvgSun;
