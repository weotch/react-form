import React, { Component } from 'react'

//

import withField from '../withField'

class SelectWrapper extends Component {
  render () {
    const {
      fieldApi: { value, setValue, setTouched },
      options,
      onChange,
      onBlur,
      placeholder,
      naturalValue,
      ...rest
    } = this.props

    const resolvedOptions = options.find(d => d.value === '') || placeholder === false
      ? options
      : [
        {
          label: placeholder || 'Select One...',
          value: '',
          disabled: true
        },
        ...options
      ]

    const nullIndex = resolvedOptions.findIndex(d => d.value === '')
    const selectedIndex = resolvedOptions.findIndex(d => d.value === value)

    return (
      <select
        {...rest}
        value={naturalValue ? value : (selectedIndex > -1 ? selectedIndex : nullIndex)}
        onChange={e => {
          const val = naturalValue ? e.target.value : resolvedOptions[e.target.value].value
          setValue(val)
          if (onChange) {
            onChange(val, e)
          }
        }}
        onBlur={e => {
          setTouched()
          if (onBlur) {
            onBlur(e)
          }
        }}
      >
        {resolvedOptions.map((option, i) => (
          <option key={option.value} value={naturalValue ? option.value : i} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
    )
  }
}

const Select = withField(SelectWrapper)

export default Select
