import React from 'react';
import colors from 'theme';
import AutocompleteDropdown from 'components/AutocompleteDropdownInput';
import {
  ClearButton,
  RightAbsolute,
  Song,
  SongInput,
  SpinningSun,
} from './SongSelect.styles';

const LoadingComponent = () => (
  <RightAbsolute>
    <SpinningSun fill={colors.orange}/>
  </RightAbsolute>
);

const ClearButtonComponent = ({ onClick }) => (
  <RightAbsolute>
    <ClearButton onClick={onClick}/>
  </RightAbsolute>
);

/**
 *  SongSelect dropdown component. Provides render props for the `AutocompleteDropdown` component.
 */
const SongSelect = props => (
  <AutocompleteDropdown
    LoadingComponent={LoadingComponent}
    InputComponent={SongInput}
    OptionComponent={Song}
    ClearButtonComponent={ClearButtonComponent}
    { ...props } />
);

export default SongSelect;
