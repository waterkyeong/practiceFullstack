package edu.pnu.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import edu.pnu.domain.Board;
import edu.pnu.service.BoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestController
public class BoardController {

	private final BoardService boardService;
	
	@GetMapping("/board")
	public ResponseEntity<?> getBoard() {
		log.info("getBoard: All");
		return ResponseEntity.ok(boardService.getBoards());	
	}
	
	@GetMapping("/board/{seq}")
	public ResponseEntity<?> getBoard(@PathVariable Long seq) {
		log.info("getBoard: "+seq);
		return ResponseEntity.ok(boardService.getBoard(seq));
	}
	
	@PostMapping("/board")
	public ResponseEntity<?> insertBoard(@RequestBody Board board) {
		log.info("insertBoard: ");
		System.out.println("=============================="+board);
		return ResponseEntity.ok(boardService.insertBoard(board));
	}
	
	@PutMapping("/board")
	public ResponseEntity<?> updateBoard(@RequestBody Board board) {
		log.info("updateBoard: ");
		System.out.println("=================================="+board);
		return ResponseEntity.ok(boardService.updateBoard(board));
	}
	
	@DeleteMapping("/board/{seq}")
	public ResponseEntity<?> deleteBoard(@PathVariable Long seq) {
		log.info("deleteBoard: ");
		return ResponseEntity.ok(boardService.deleteBoard(seq));
	}
}
