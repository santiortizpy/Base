package py.pol.una.ii.pw.util;

import java.io.IOException;
import java.io.InputStream;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

public abstract class SessionFactoryWrapper {
	
	  private SqlSessionFactory factory;
	    
	    /**Retorna el  fichero de configuración XML para Mybatis.
	     * mybatis/configuraciones/MyBatisConfiguration.xml
	     * @return
	     */    
	    protected abstract String getConfigURI();
	   
	    /**
	     * Obtiene  una instancia SqlSessionFactory
	     * @throws IOException
	     */
	    public SessionFactoryWrapper() throws IOException {
	        String resource = getConfigURI();
	        InputStream inputStream = Resources.getResourceAsStream(resource);
	        factory = new SqlSessionFactoryBuilder().build(inputStream);
	    }
	    
	    /**
	     * Metodo que retorna el SqlSessionFactory
	     * @return
	     */
	    public SqlSession getSqlSession() {
	        return factory.openSession();
	    }

}
