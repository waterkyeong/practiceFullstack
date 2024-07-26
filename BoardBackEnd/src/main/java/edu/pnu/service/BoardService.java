package edu.pnu.service;

import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import edu.pnu.domain.Board;
import edu.pnu.persistence.BoardRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardService {

	private final BoardRepository boardRepo;
	
	public List<Board> getBoards() {
		return boardRepo.findAll();
	}
	public Board getBoard(Long seq) {
		return boardRepo.findById(seq).get();
	}
	public Board insertBoard(Board board) {
		board = Board.builder().title(board.getTitle()).content(board.getContent()).writer(board.getWriter()).createDate(new Date()).build();
		return boardRepo.save(board);
	}
	public Board updateBoard(Board board) {
		Board findB = boardRepo.findById(board.getSeq()).get();
		findB.setTitle(board.getTitle());
		findB.setContent(board.getContent());
		findB.setCreateDate(new Date());
		return boardRepo.save(findB);
	}
	public Board deleteBoard(Long seq) {
		Board findB = boardRepo.findById(seq).get();
		boardRepo.delete(findB);
		return findB;
	}
}
