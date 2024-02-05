var logContainer = document.getElementById('log-container');
var kanbanBoard = document.getElementById('kanban-board');
var todoColumn = document.getElementById('todo');
var inProgressColumn = document.getElementById('in-progress');
var doneColumn = document.getElementById('done');
var kanbanColumns = [todoColumn, inProgressColumn, doneColumn];
var drake = dragula(kanbanColumns, {
    moves: function (el, source, handle, sibling) {
        return handle.classList.contains('kanban-item');
    }
});



// Atualize esta função no seu script_instalacao.js
function checkAuditStatus(target) {
  var doneItems = Array.from(doneColumn.getElementsByClassName('kanban-item'));
  var isAuditComplete = doneItems.length === 23;

  if (isAuditComplete) {
      doneItems.forEach(function (item) {
          var coluna = getItemColumn(item);
          var status = getStatusFromColumn(coluna);
          var logMessage = `Item dropped: ${item.textContent} from ${coluna} to ${target.id}: ${status}`;
          console.log(logMessage); 
                  
          logContainer.innerHTML += `<p>${logMessage}</p>`;
      });

      // Restante do código...
  }
}



function addToLog(message) {
    var logTerminal = document.getElementById('log-terminal');
    var logMessage = document.createElement('div');
    logMessage.textContent = message;
    logTerminal.appendChild(logMessage);
}

function getStatusFromColumn(column) {
  switch (column) {
      case 'done':
          return 'Aprovado';
      case 'in-progress':
          return 'Reprovado';
      case 'todo':
          return 'Não Auditado';
      default:
          return 'Desconhecido';
  }
}

// Função para gerar o log e oferecer para download
function gerarLogDownload(doneItems) {
  // Função para obter a coluna na qual o item está
  function getItemColumn(item) {
    for (var i = 0; i < kanbanColumns.length; i++) {
        if (kanbanColumns[i].contains(item)) {
            return kanbanColumns[i].id;
        }
    }
    return null;
  }

  var log = "Status dos Itens:\n";

  doneItems.forEach(function (item) {
      var coluna = getItemColumn(item);
      var status = getStatusFromColumn(coluna);
      log += `${item.textContent}: ${status}\n`;
  });

  // Criar um Blob (Binary Large Object) com o conteúdo do log
  var blob = new Blob([log], { type: 'text/plain' });

  // Criar um link para download
  var link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = 'log_auditoria.txt';

  // Adicionar o link ao corpo do documento
  document.body.appendChild(link);

  // Simular um clique no link para iniciar o download
  link.click();

  // Remover o link do corpo do documento
  document.body.removeChild(link);
}




function checkAuditStatus(target) {
  var doneItems = Array.from(doneColumn.getElementsByClassName('kanban-item'));
  var isAuditComplete = doneItems.length === 22;

  if (isAuditComplete) {
      // Exibir a caixa de diálogo SweetAlert2 com mensagem de aprovação
      const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
              confirmButton: 'btn btn-success',
          },
          buttonsStyling: false,
          theme: 'dark',
      });

      swalWithBootstrapButtons.fire({
          title: 'Auditoria Aprovada!',
          text: 'Seguindo para a próxima etapa...',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
      }).then(() => {
          // Após fechar o alerta, gerar o log e oferecer para download
          gerarLogDownload(doneItems);
          
          // Remover a classe 'completed' dos itens (opcional)
          doneItems.forEach(function (item) {
              item.classList.remove('completed');
          });

          // Adicionar a classe 'dragula-no-drag' novamente para impedir arrastar
          drake.containers.forEach(function (container) {
              container.classList.add('dragula-no-drag');
          });

          // Recarregar a página após algum tempo (opcional)
          setTimeout(function () {
              location.reload();
          }, 3000);
      });
  }
}





drake.on('drop', function (el, target, source, sibling) {
    console.log('Item dropped:', el.textContent, 'from', source.id, 'to', target.id);
    checkAuditStatus(target);

    if (target === inProgressColumn) {
        // Aguardar 2 segundos antes de abrir o popup de reprovação
        setTimeout(function () {
            openRejectionFormPopup(el.textContent);
        }, 2000);
    }
});

function openRejectionFormPopup(itemText) {
    // Utilizando o SweetAlert2 para uma caixa de diálogo mais atraente
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
  
    swalWithBootstrapButtons.fire({
      title: 'REPROVADO!',
      text: `Deseja abrir o formulário de reprovação para o item "${itemText}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, abrir formulário',
      cancelButtonText: 'Não, cancelar',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // Adicione aqui a lógica para abrir o formulário de reprovação
        var formPopup = window.open('', 'Rejection Form', 'width=640,height=1567');
  
        if (formPopup) {
          formPopup.document.write(
            '<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdK9c_cAivawUu5ab7iMhZgrvAja3pQyVWeecbTHIKLu7DGww/viewform?embedded=true" width="640" height="1788" frameborder="0" marginheight="0" marginwidth="0">Carregando…</iframe>'
          );
        } else {
          // Utilizando o SweetAlert2 para uma caixa de diálogo mais atraente
          Swal.fire({
            title: 'Erro ao abrir o formulário!',
            text: 'O bloqueio de pop-ups pode estar impedindo a abertura do formulário. Verifique as configurações do seu navegador.',
            icon: 'error',
          });
        }
      } else {
        // Utilizando o SweetAlert2 para uma caixa de diálogo mais atraente
        Swal.fire({
          title: 'Operação Cancelada',
          text: 'Item reprovado, mas formulário não aberto.',
          icon: 'info',
        });
      }
    });
  }function openRejectionFormPopup(itemText) {
  // Adicionando a classe 'dark' ao corpo do documento para o tema dark
  document.body.classList.add('dark');

  // Utilizando o SweetAlert2 para uma caixa de diálogo mais atraente
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-outline-warning m-2',
      cancelButton: 'btn btn-outline-danger',
    },
    buttonsStyling: false,
  });

  swalWithBootstrapButtons.fire({
    title: 'Ahh não, um iitem foi reprovado!🫠',
    text: `Deseja abrir o formulário de reprovação para o item "${itemText}"?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sim, abrir formulário',
    cancelButtonText: 'Não, cancelar',
    reverseButtons: true,
  }).then((result) => {
    // Removendo a classe 'dark' ao corpo do documento após a conclusão da ação
    document.body.classList.remove('dark');

    if (result.isConfirmed) {
      // Adicione aqui a lógica para abrir o formulário de reprovação
      var formPopup = window.open('', 'Rejection Form', 'width=640,height=1567');

      if (formPopup) {
        formPopup.document.write(
          '<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdK9c_cAivawUu5ab7iMhZgrvAja3pQyVWeecbTHIKLu7DGww/viewform?embedded=true" width="640" height="1788" frameborder="0" marginheight="0" marginwidth="0">Carregando…</iframe>'
        );
      } else {
        // Utilizando o SweetAlert2 para uma caixa de diálogo mais atraente
        Swal.fire({
          title: 'Erro ao abrir o formulário!',
          text: 'O bloqueio de pop-ups pode estar impedindo a abertura do formulário. Verifique as configurações do seu navegador.',
          icon: 'error',
        });
      }
    } else {
      // Utilizando o SweetAlert2 para uma caixa de diálogo mais atraente
      Swal.fire({
        title: 'Operação Cancelada',
        text: 'Item reprovado, mas formulário não aberto.',
        icon: 'info',
      });
    }
  });
}

  
  

var restartButton1 = document.getElementById('restart-button1');
restartButton1.addEventListener('click', function () {
    // Adicione aqui o código para reiniciar ou executar outra ação desejada
    // Adicionar a classe 'dragula-no-drag' novamente para impedir arrastar
    drake.containers.forEach(function (container) {
        container.classList.add('dragula-no-drag');
    });

    // Remover a classe 'completed' dos itens
    var doneItems = Array.from(doneColumn.getElementsByClassName('kanban-item'));
    doneItems.forEach(function (item) {
        item.classList.remove('completed');
    });
});

// Função para recarregar a página
function reloadPage() {
    location.reload();
}
