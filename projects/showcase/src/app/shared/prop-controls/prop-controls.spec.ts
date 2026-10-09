import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

import { booleanControl, numberControl, selectControl, textControl } from './control-def';
import { PropControls } from './prop-controls';

describe('PropControls', () => {
  it('calls each control setter with the new value on change', async () => {
    const setText = jest.fn();
    const setNumber = jest.fn();
    const setSelect = jest.fn();
    const setBoolean = jest.fn();

    await render(PropControls, {
      inputs: {
        controls: [
          textControl('label', 'Label', 'Admit patient', setText),
          numberControl('capacity', 'Capacity', 24, setNumber),
          selectControl('variant', 'Variant', ['primary', 'secondary'], 'primary', setSelect),
          booleanControl('disabled', 'Disabled', false, setBoolean),
        ],
      },
    });

    await userEvent.clear(screen.getByLabelText('Label'));
    await userEvent.type(screen.getByLabelText('Label'), 'x');
    expect(setText).toHaveBeenLastCalledWith('x');

    await userEvent.clear(screen.getByLabelText('Capacity'));
    await userEvent.type(screen.getByLabelText('Capacity'), '30');
    expect(setNumber).toHaveBeenLastCalledWith(30);

    await userEvent.selectOptions(screen.getByLabelText('Variant'), 'secondary');
    expect(setSelect).toHaveBeenCalledWith('secondary');

    await userEvent.click(screen.getByLabelText('Disabled'));
    expect(setBoolean).toHaveBeenCalledWith(true);
  });
});
