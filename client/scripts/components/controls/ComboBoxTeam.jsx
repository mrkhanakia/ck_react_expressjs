import React, { Component } from "react";


import ComboBox from './ComboBox.jsx'

class ComboBoxTeam extends ComboBox {
  constructor(props) {
    super(props)
  }
  static defaultProps = {
    field_name: '',
    field_id: '',
    width: 225,
    onChange: function(){},
    onSelect: function() {},
    onClose: function() {},
    selectedValue: null,
    width: 225,
    url: '/teams',
    valueMember: '_id',
    displayMember: 'team_name'
  }
}

export default ComboBoxTeam;
