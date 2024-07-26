import React, { useState, useEffect } from 'react';

const DisplayData = () => {
    const [dataBoard, setDataBoard] = useState([]);
    const [selectedBoard, setSelectedBoard] = useState(null);
    const [board, setBoard] = useState({
        seq: null,
        title: '',
        content: '',
        writer: ''
    });

    useEffect(() => {
        // 컴포넌트가 마운트될 때 모든 게시물을 불러옵니다.
        loadBoard();
    }, []);

    useEffect(() => {
        if (selectedBoard) {
            setBoard({
                seq: selectedBoard.seq,
                title: selectedBoard.title || '',
                content: selectedBoard.content || '',
                writer: selectedBoard.writer || ''
            });
        } else {
            setBoard({
                seq: null,
                title: '',
                content: '',
                writer: ''
            });
        }
    }, [selectedBoard]);

    const resetForm = () => {
        setBoard({
            seq: null,
            title: '',
            content: '',
            writer: ''
        });
    };

    const loadBoard = async () => {
        try {
            const response = await fetch('http://localhost:8080/board');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setDataBoard(result);
        } catch (error) {
            console.error('Error fetching Board:', error);
        }
    };

    const handleBoardClick = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/board/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setSelectedBoard(result);
        } catch (error) {
            console.error('Error fetching single Board:', error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setBoard(prevBoard => ({
            ...prevBoard,
            [name]: value
        }));
    };

    const insertBoard = async (event) => {
        event.preventDefault();
        const { title, content, writer } = event.target.elements;

        const newBoard = {
            title: title.value,
            content: content.value,
            writer: writer.value
        };

        try {
            const response = await fetch('http://localhost:8080/board', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':'jwt-token'
                },
                body: JSON.stringify(newBoard),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            console.log('Board inserted:', await response.json());
            await loadBoard(); // 새 데이터를 로드하여 화면에 반영
        } catch (error) {
            console.error('Error inserting Board:', error);
        }
    };

    const updateBoard = async (e)=>{
        e.preventDefault();
        const { title, content, writer } = e.target.elements;

        const updateBoard = {
            ...board,
            title: board.title,
            content: board.content,
            writer: board.writer
        };

        try {
            const response = await fetch('http://localhost:8080/board', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':'jwt-token'
                },
                body: JSON.stringify(updateBoard),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            console.log('Board updated:', await response.json());
            await loadBoard(); 
            setSelectedBoard(null)
            resetForm();
        } catch (error) {
            console.error('Error inserting Board:', error);
        }
    };

    const deleteBoard = async ()=>{
        if (!board.seq) return; // seq가 없으면 삭제하지 않음
        try {
            const response = await fetch(`http://localhost:8080/board/${board.seq}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':'jwt-token'
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            console.log('Board deleted');
            await loadBoard();
            resetForm(); // 폼 초기화
            setSelectedBoard(null); // 선택된 보드 초기화
        } catch (error) {
            console.error('Error deleting Board:', error);
        }
    };

    return (
        <div>
            <h2>Data Display</h2>

            <div>
                <table align='center'>
                    <thead>
                        <tr>
                            <th>ID</th><th>Title</th><th>Writer</th>
                            <th>Content</th><th>Create Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataBoard.map(board => (
                            <tr key={board.seq} onClick={() => handleBoardClick(board.seq)} style={{ cursor: 'pointer' }}>
                                <td>{board.seq}</td>
                                <td>{board.title}</td>
                                <td>{board.writer}</td>
                                <td>{board.content}</td>
                                <td>{board.createDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <form onSubmit={selectedBoard ? updateBoard : insertBoard}>
                <h3>Edit Board</h3>
                <input name='title' type='text' placeholder="Title"  value={board.title} onChange={handleChange}/>            
                <input name='content' type='text' placeholder="Content" value={board.content} onChange={handleChange}/>
                <input name='writer' type='text' placeholder="Writer" value={board.writer} onChange={handleChange}/>
                <br/>
                <button type='submit'>{selectedBoard ? 'Update' : 'Write'}</button>
                {selectedBoard && (<button type='button' onClick={deleteBoard}>delete</button>)}
            </form>
        </div>
    );
};

export default DisplayData;
