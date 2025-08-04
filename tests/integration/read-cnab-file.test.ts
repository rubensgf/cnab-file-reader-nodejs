import { exec } from 'child_process'
import path from 'path'
import fs from 'fs';

describe('CLI - leitura de Arquivo CNAB', () => { 
    const  custonFile = path.resolve(__dirname, '../../src/data/cnabCustom.rem');

    it('Deve utilizar o arquivo default quando nenhum caminho for passado', (done) =>{
  
        exec('ts-node src/main.ts', (err,stdout) => {
            if (err) {
                console.error('Erro ao executar CLI:', err);
                return done(err);
            }

            expect(stdout).toContain('segment');
            expect(stdout).toContain('position');
            done(); 
        });
    });

    it('Deve utilizar o arquivo informado via linha de comando', (done) => {
        jest.setTimeout(10000);
    
        exec(`ts-node src/main -- --file ${custonFile}`, (err, stdout) => {

        
            if (err) {
                console.error('Erro ao executar CLI:', err);
                return done(err);
            }

            expect(stdout).toContain('segment');
            expect(stdout).toContain('position');
            done();
        });
      });

    it('Deve exibir erro se o arquivo informado não existir', (done) => {
        jest.setTimeout(10000);
        const invalidPath = 'tests/data/inexistente.rem';
      
        exec(`ts-node src/main.ts -- --file ${invalidPath}`, (err, stdout, stderr) => {
          expect(stderr).toContain(`Arquivo não encontrado`);
          done();
        });
    });

    it('Deve filtrar linhas pelo segmento informado via linha de comando', (done) => {
        exec(`ts-node src/main.ts -- --file src/data/cnabCustom.rem --segment Q`, (err, stdout) => {
          if (err) return done(err);
          
          expect(stdout).toContain('Q');
          expect(stdout).toContain('NTT');
          done();
        });
      });
    
    it('Deve filtrar linhas pelo nome da empresa informado via linha de comando', (done) => {
        exec(`ts-node src/main.ts -- --file src/data/cnabCustom.rem --company cai`, (err, stdout) => {
            if (err) return done(err);
        
            expect(stdout).toContain('CAIXA');
            done();
        });
    });

    it('Deve filtrar por segmento e nome da empresa ao mesmo tempo', (done) => {
        exec(`ts-node src/main.ts -- --file src/data/cnabCustom.rem --segment Q --company NTT`, (err, stdout) => {
          if (err) return done(err);
          expect(stdout).toContain('Q');
          expect(stdout).toContain('NTT');
          done();
        });
      });

      it('Deve gerar arquivo JSON com resultado da filtragem', (done) => {
        jest.setTimeout(10000);
        const outputPath = path.resolve(__dirname, '../../src/public/resultado.json');

    
        if (fs.existsSync(outputPath)) {
            fs.unlinkSync(outputPath);
        }
    
        exec(`ts-node src/main.ts -- --file src/data/cnabCustom.rem --segment Q --export ${outputPath}`, (err, stdout, stderr) => {
         
    
            if (err) return done(err);
    
            expect(fs.existsSync(outputPath)).toBe(true);
    
            const content = fs.readFileSync(outputPath, 'utf-8');
            const json = JSON.parse(content);
    
            expect(Array.isArray(json)).toBe(true);
            expect(json.length).toBeGreaterThan(0);
            expect(json[0].segment).toBe('Q');
            done();
        });
    });
});