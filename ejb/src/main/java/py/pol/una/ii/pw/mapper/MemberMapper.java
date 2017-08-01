package py.pol.una.ii.pw.mapper;

import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.type.JdbcType;

import py.pol.una.ii.pw.model.Member;

public interface MemberMapper {

	
	
	 @Select({
	        "select",
	        "id, name, email, phonenumber",
	        "from MEMBER",
	        "where id = #{id,jdbcType=DECIMAL}"
	    })
	    @Results({
	        @Result(column="id", property="id", jdbcType=JdbcType.DECIMAL, id=true),
	        @Result(column="name", property="name", jdbcType=JdbcType.VARCHAR),
	        @Result(column="email", property="email", jdbcType=JdbcType.VARCHAR),
	        @Result(column="phonenumber", property="phoneNumber", jdbcType=JdbcType.VARCHAR),
	        
	    })
	    Member selectByPrimaryKey(Long long1);
}
