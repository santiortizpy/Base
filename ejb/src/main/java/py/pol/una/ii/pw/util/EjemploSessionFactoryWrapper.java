package py.pol.una.ii.pw.util;

import java.io.IOException;

import javax.ejb.Singleton;
import javax.ejb.Startup;
import javax.enterprise.context.RequestScoped;
import javax.enterprise.inject.Disposes;
import javax.enterprise.inject.Produces;

import org.apache.ibatis.session.SqlSession;

@Singleton
@Startup
public class EjemploSessionFactoryWrapper  extends SessionFactoryWrapper {
	public EjemploSessionFactoryWrapper() throws IOException {
	}

	@Override
	protected String getConfigURI() {
		return "mybatis/configuraciones/MyBatisConfiguration.xml";
	}
	
	@Produces
	@RequestScoped
	public SqlSession getMyBatisSqlSession() {
		return getSqlSession();
	}
	
	public void releaseMyBatisSqlSession(@Disposes SqlSession session) {
		if (session!=null) {
			session.close();
		}
	}
}