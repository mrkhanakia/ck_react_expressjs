import React, { Component } from "react";

import JqxComboBox from '../jqwidgets-react/react_jqxcombobox.js';

class ComboBox extends Component {
  static defaultProps = {
    field_name: '',
    field_id: '',
    width: 225,
    onChange: function(){},
    onSelect: function() {},
    onClose: function() {},
    selectedValue: null,
    url: '',
    valueMember: '_id',
    displayMember: 'name'
  }
  
  


  componentWillUnmount() {
    // it was giving error on route change it was still calling the change method for eg. Journal Page select account and then change route
    this.refs.Combo.off('change')
  }
  componentDidMount() {
    this.refs.Combo.on('change', (e) => {
      var item = this.getSelectedItem();
      // console.log(item)
      if(item) {
        this.refs.nameInput.value = item.label
        this.refs.idInput.value = item.value

      } else {
        this.refs.nameInput.value = null;
        this.refs.idInput.value = null;
      }
      this.props.onChange(e)
    });

    this.refs.Combo.on('select', (e) => {
      this.props.onSelect(e)
    });

    this.refs.Combo.on('close', (e) => {
      this.props.onClose(e)
    });

    if(this.props.selectedValue) {
      this.setSelectedValue(this.props.selectedValue);
    }
  }

  componentDidUpdate() {
     if(this.props.selectedValue) {
      this.setSelectedValue(this.props.selectedValue);
    }
  }
  getSelectedValue() {
    var item = this.refs.Combo.getSelectedItem();
    if(item) return item.value;
    return null;
  }

  getSelectedItem() {
    var item = this.refs.Combo.getSelectedItem();
    if(item) return item;
    return null;
  }

  setSelectedValue(val) {
    this.refs.Combo.selectItem(val);
  }

  rebind() {
    this.dataAdapter.dataBind()
  }

  buttonClick() {
    console.log( this.refs.JqxComboBox.getSelectedItem().value)
  }

  render() {  
    let source =
        {
            datatype: 'json',
            datafields: [
                { name: this.props.valueMember },
                { name: this.props.displayMember }
            ],
            url: this.props.url,
            async: false
        };
    this.dataAdapter = new $.jqx.dataAdapter(source, { async: false });

    return (
      <div>
          <input type="hidden" ref="nameInput" name={this.props.field_name} />
          <input type="hidden" ref="idInput" name={this.props.field_id} />
          <JqxComboBox ref='Combo'
              autoComplete={true} searchMode={'startswithignorecase'}
              width={this.props.width} height={22} selectedIndex={-1} source={this.dataAdapter}
              displayMember={this.props.displayMember} valueMember={this.props.valueMember}
          />

          {/*<button onClick={() => this.buttonClick()}>Get Value</button>*/}
      </div>
    )
  }
}

export default ComboBox;
