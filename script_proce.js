
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


function addToLog(message) {
    var logTerminal = document.getElementById('log-terminal');
    var logMessage = document.createElement('div');
    logMessage.textContent = message;
    logTerminal.appendChild(logMessage);
}

function checkAuditStatus() {
    var doneItems = Array.from(doneColumn.getElementsByClassName('kanban-item'));
    var isAuditComplete = doneItems.length === 29;

    if (isAuditComplete) {
        // Adicionar a classe 'completed' aos itens concluídos
        doneItems.forEach(function (item) {
            item.classList.add('completed');
        });

        // Remover a classe 'dragula-no-drag' para permitir arrastar novamente
        drake.containers.forEach(function (container) {
            container.classList.remove('dragula-no-drag');
        });

        // Aguardar 3 segundos antes de alertar a aprovação
        setTimeout(function () {
            // Exibir caixa de diálogo SweetAlert2 com mensagem de aprovação
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-success',
                },
                buttonsStyling: false,
                theme: 'dark', // Adiciona o tema dark
            });

            swalWithBootstrapButtons.fire({
                title: 'Auditoria Aprovada!',
                text: 'Seguindo para a próxima etapa...',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false
            }).then(() => {
                // Após fechar o alerta, recarregar a página
                location.reload();
            });             
           
        }, 3000);
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
            '<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSd31qZk9qZf7I3vu1diyXN5EGlTKiUYYPCblTqalpXZsPpPLA/viewform?embedded=true" width="640" height="1039" frameborder="0" marginheight="0" marginwidth="0">Carregando…</iframe>'
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
    title: 'Item Reprovado 🫠😥📝',
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
          '<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSd31qZk9qZf7I3vu1diyXN5EGlTKiUYYPCblTqalpXZsPpPLA/viewform?embedded=true" width="640" height="1039" frameborder="0" marginheight="0" marginwidth="0">Carregando…</iframe>'
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
