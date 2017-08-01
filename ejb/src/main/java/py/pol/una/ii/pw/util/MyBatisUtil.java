package py.pol.una.ii.pw.util;

import java.io.IOException;
import java.io.InputStream;

import javax.ejb.Singleton;
import javax.ejb.Startup;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

@Singleton
@Startup
public class MyBatisUtil {
 	private static SqlSessionFactory sqlSessionFactory;
	static {
		String resource = "mybatis/configuraciones/MyBatisConfiguration.xml";
		InputStream inputStream;
		try {
			inputStream = Resources.getResourceAsStream(resource);
			sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	public static SqlSessionFactory getSqlSessionFactory(){
		return sqlSessionFactory;
	}
} 
