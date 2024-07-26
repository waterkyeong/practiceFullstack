import React, { useState} from 'react'

const DisplayData = () => {
    const [dataBoard, setDataBoard] = useState([]);

    const loadBoard = async ()=>{
        await fetch('http://localhost:8080/board'
            // , {
            // method:'POST',
            // headers:{
            //     'Content-Type':'application/json',
            //     'Authorization':'jwt-token'
            // },
            // body:JSON.stringify(board)
            // }
        )
        .then(resp => {
            return resp.json();
        }).then(result => {
            setDataBoard(result);
        }).catch(error => {
            console.error('Error fetching Board:',error);
        })
    };

    const loadData = ()=>{
        return(
            <table align='center'>
                <thead>
                    <tr>
                        <th>seq</th><th>title</th><th>writer</th>
                        <th>content</th><th>createDate</th>
                    </tr>
                </thead>
                <tbody>
                    {dataBoard.map(board =>(
                        <tr key={board.seq}>
                            <td>{board.seq}</td>
                            <td>{board.title}</td>
                            <td>{board.writer}</td>
                            <td>{board.content}</td>
                            <td>{board.createDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }
    const insertBoard = async (event)=>{
        event.preventDefault();
        const {title, content, writer } = event.target.elements;

        const newBoard = {
            title : title.value,
            content : content.value,
            writer : writer.value
        }
        console.log(newBoard)
        await fetch('http://localhost:8080/board',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(newBoard),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(() => {
                loadBoard();
            })
            .catch(error => {
                console.error('Error inserting Board:', error);
            });
    }
    return (
        <div>
      <h2>Data Display</h2>
      <button onClick={()=>loadBoard()}>Board</button>
      <div>{loadData()}</div>
      <form  onSubmit={insertBoard}>
            <input name='title' type='text' placeholder="Title"/>            
            <input name='content' type='text' placeholder="Content"/>
            <input name='writer' type='text' placeholder="Writer"/>
            <button type= 'submit'>write</button>
      </form>
    </div>
  )
}
export default DisplayData;
