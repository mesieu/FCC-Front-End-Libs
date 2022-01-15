const placeholder = `
# Markdown previewer
## Below are a few examples of what you can do :
### H3 Heading

Here is an inline code example : \`<div></div>\`.

Here is a code block :
\`\`\`
class Component extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      string: 'Hello World!'
    }
  }
  render(){
    return(
      <div>{this.state.string}</div>
    )
  }
}

\`\`\`

You can make text **bold**, _italic_ or ~~crossed out words~~.

Here is a link : [freecodecamp.org](https://www.freecodecamp.org)

Here is a block quote : 
> "How wonderful it is that nobody need wait a single moment before starting to improve the world."
>> -Anne Frank


Here is a numbered list :
1. Item 1
1. Item 2
1. Item 3

Finally, you can also link images :

![Markdown](https://upload.wikimedia.org/wikipedia/commons/4/48/Markdown-mark.svg)
`;

export default placeholder;