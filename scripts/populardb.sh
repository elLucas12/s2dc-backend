#!/bin/bash
# populardb.sh -- Popula um determinado banco de dados mariadb/mysql com os dados necessários ao sistema s2dc.
# autor: elLucas12
# data: 08-12-2025
# url: https://github.com/elLucas12/s2dc-backend

if [[ -f ".env" ]]; then
  source .env
  mysql -h"$DB_HOST" -u"$DB_USERNAME" -p"$DB_PASSWORD" --database="$DB_NAME" << EOF
--- Usuário Administrativo inicial ---
INSERT INTO UsuarioAdministrativo (permissao, nome, senha, nomeDeUsuario, email) VALUES ("Administrador", "Admin. Mestre", "\$2b\$12\$/C9cvSe1otZecSEwz.QQj./Um9LESLtZBx6gXqW1U6wCdfElKGp62", "admin", "admin@admin.localhost");

--- Valores de Tipos Sanguineos ---
INSERT INTO TipoSanguineo (tipo, fatorRh) VALUES ("A", "Positivo");
INSERT INTO TipoSanguineo (tipo, fatorRh) VALUES ("B", "Positivo");
INSERT INTO TipoSanguineo (tipo, fatorRh) VALUES ("AB", "Positivo");
INSERT INTO TipoSanguineo (tipo, fatorRh) VALUES ("O", "Positivo");
INSERT INTO TipoSanguineo (tipo, fatorRh) VALUES ("A", "Negativo");
INSERT INTO TipoSanguineo (tipo, fatorRh) VALUES ("B", "Negativo");
INSERT INTO TipoSanguineo (tipo, fatorRh) VALUES ("AB", "Negativo");
INSERT INTO TipoSanguineo (tipo, fatorRh) VALUES ("O", "Negativo");
EOF
else
  echo "Não foi possível popular o banco!"
  echo "Não estão definidas as variáveis de ambiente..."
  return 1
fi