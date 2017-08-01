/*
 * JBoss, Home of Professional Open Source
 * Copyright 2013, Red Hat, Inc. and/or its affiliates, and individual
 * contributors by the @authors tag. See the copyright.txt in the
 * distribution for a full listing of individual contributors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package py.pol.una.ii.pw.service;

import java.util.List;
import java.util.logging.Logger;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;

import py.pol.una.ii.pw.mapper.MemberMapper;
import py.pol.una.ii.pw.model.Member;
import py.pol.una.ii.pw.util.EjemploSessionFactoryWrapper;

// The @Stateless annotation eliminates the need for manual transaction demarcation
@Stateless
public class MemberRegistration {

    @Inject
    private Logger log;

   /* @Inject
    private EntityManager em;*/
    
    @EJB
    private EjemploSessionFactoryWrapper factory;

   

    public Member findById(Long member) throws Exception {
    	SqlSession sesion = null;
    	try {
    		sesion = factory.getSqlSession();
    		MemberMapper mapper = sesion.getMapper(MemberMapper.class);
    		Member encontrado = mapper.selectByPrimaryKey(member);
    		//SosUmbralesSegmentacionMapper mapper = sesion.getMapper(SosUmbralesSegmentacionMapper.class);
			//SosUmbralesSegmentacion encontrado = mapper.selectByPrimaryKey(sosUmbral);
        log.info("Registering " + encontrado.getName());
       //em.persist(member);
       return encontrado;
    	} catch (Exception e) {
			throw new Exception();
		} finally {
			sesion.close();
		}
    }
}
