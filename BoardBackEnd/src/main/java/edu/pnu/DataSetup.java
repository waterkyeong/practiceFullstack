package edu.pnu;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import edu.pnu.domain.Board;
import edu.pnu.domain.Member;
import edu.pnu.domain.Role;
import edu.pnu.persistence.BoardRepository;
import edu.pnu.persistence.MemberRepository;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DataSetup implements ApplicationRunner {

	private final BoardRepository boardRepo;
	private final MemberRepository memRepo;
	
	@Override
	public void run(ApplicationArguments args) throws Exception {
		String s[] = {"홍길동","홍이동"};
		for(int i =1; i<=10; i++) {
			boardRepo.save(Board.builder().title("title"+i).content("content"+i).writer(s[i%2]).build());
		}
		memRepo.save(Member.builder().id("member").password("abcd").username("mem1").role(Role.ROLE_MEMBER).enabled(true).build());
		memRepo.save(Member.builder().id("manager").password("abcd").username("mana1").role(Role.ROLE_MANAGER).enabled(true).build());
		memRepo.save(Member.builder().id("admin").password("abcd").username("ad1").role(Role.ROLE_ADMIN).enabled(true).build());
	}
	
}