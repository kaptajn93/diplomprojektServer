import React from 'react'

var textareaStyle = {
  minHeight:'800px'
};

const CKEditor = React.createClass({

  isComponentInitialized : false,
  ckEditor : null,
  shouldComponentUpdate: function(){
    return true;
  },

  componentDidMount : function(){
    var initialText = this.props.text;
    var textChanged = this.props.onTextChangedCallback;
    var isDataSet = false;

    this.ckEditor = CKEDITOR.replace(this.refs.editor, {
      height: 600,
      contentsCss: [
        CKEDITOR.getUrl( 'https://fonts.googleapis.com/css?family=Roboto:400,300,500' ),
        // Add CSS for widget styles.
        'https://fonts.googleapis.com/css?family=Roboto:400,300,500',
        'ckEditor.css'
        ]
      });
    var ckEditor = this.ckEditor;

    this.ckEditor.on('instanceReady', function() {
      ckEditor.setData(initialText);
      this.isDataSet = true;
    });

    function updateModel(event) {
      if (this.isComponentInitialized){
        var newText = ckEditor.getData();
        if (textChanged !== undefined && newText !== initialText)
          textChanged(newText);
      }
      else if (this.isDataSet && event.name === 'dataReady')
        this.isComponentInitialized = true;
    };

    function dataReady(event){
      this.updateModel(event);
    };

    function change(evnet){
      this.updateModel(event);
    };

    this.ckEditor.on('change', updateModel);
    this.ckEditor.on('key', updateModel);
    this.ckEditor.on('dataReady', updateModel);
  },

  componentWillUnmount: function(){
    var foo = 3;
    console.log("CK-editor unmount");
    this.ckEditor.destroy();
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.text === null){
      this.ckEditor.setData("");
    }
    else if (nextProps.text !== this.props.text){
      this.ckEditor.setData(nextProps.text);
    }
  },

  render: function(){
    return (
      <textarea style={textareaStyle} ref="editor" ></textarea>
    )
  }
});

export default CKEditor
