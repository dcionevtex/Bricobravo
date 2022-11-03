let debounce = 0;
let debounceCustomDataEmpty = 0;

$(document).ready(function() {
  var urlParams = new URLSearchParams(window.location.search);

  if(urlParams.get('dentistName')) {
    $('.modalCheckout').addClass('modalCheckout--active');

    $('.js-recommended-patientname').text(urlParams.get('patientName'));
    $('.js-recommended-dentistname').text(urlParams.get('dentistName'));
    $('.js-recommended-coupon').val(urlParams.get('couponCode'));

    localStorage.setItem('couponCodeRecommendation', urlParams.get('couponCode'));
    localStorage.setItem('patientNameRecommendation', urlParams.get('patientName'));

    $('.js-modal-close').click(function(_event) {
      _event.preventDefault();
      $('.modalCheckout').removeClass('modalCheckout--active');
    });

    $('.modalCheckout__button').click(function(_event) {
      _event.preventDefault();

      var textValue = $('.js-recommended-coupon').val();
      var el = document.createElement('textarea');

      el.value = textValue;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);

      $(this).text('Copiado!')

      setTimeout(function() {
        $('.modalCheckout').removeClass('modalCheckout--active');
      }, 1000)
    });
  }

  const submitButton = document.querySelectorAll('#payment-data-submit')[1];

  $(window).on('orderFormUpdated.vtex', function(evt, orderForm) {

    setTimeout( () => {
      const checkboxElement = document.querySelector('.terms__checkbox');

      if(checkboxElement && checkboxElement.checked === false && submitButton.disabled === false){
        submitButton.disabled = true;
      } 

    }, 500);

  });

  const termsWrapper = document.createElement('div')
  termsWrapper.className = 'terms'

  const firstColumn = document.createElement('div')
  firstColumn.className = 'terms__column'

  const secondColumn = document.createElement('div')
  secondColumn.className = 'terms__column'

  const checkbox = document.createElement('input')
  checkbox.className = 'terms__checkbox'
  checkbox.type = 'checkbox'

  const firstText = document.createElement('p');
  firstText.classList = 'terms__text';
  firstText.innerHTML = 'Ao clicar em concluir vocÃª concorda que a Colgate-Palmolive colete e armazene 	seus dados fornecidos, tudo conforme os termos da nossa <a href="/institucional/politica-de-privacidade" target="_blank">"PolÃ­tica de Privacidade"</a>'

  const secondText = document.createElement('p');
  secondText.classList = 'terms__text';
  secondText.innerHTML = 'A qualquer momento, vocÃª tem o direito de revogar o seu consentimento por meio de uma solicitaÃ§Ã£o gratuita Ã  Colgate atravÃ©s da pÃ¡gina <a href="https://colgatebrasil.com.br/revogacao-acesso-a-dados/" target="_blank">RevogaÃ§Ã£o de Acesso a Dados</a>'

  checkbox.addEventListener('change', event => {
    
    if(event.target.checked === true) {
      submitButton.disabled = false
      
    } else {
		  submitButton.disabled = true
		}
	})

  firstColumn.appendChild(checkbox);
  secondColumn.appendChild(firstText);
  secondColumn.appendChild(secondText);

  termsWrapper.appendChild(firstColumn);
  termsWrapper.appendChild(secondColumn);

  submitButton.insertAdjacentElement('afterend', termsWrapper)


  if (window.location.hash == "#/payment" ) {

    setTimeout( () => {
    
      const checkboxElement = document.querySelector('.terms__checkbox');
  
      if (checkboxElement && checkboxElement.checked === false && debounce == 0) {
        debounce++;
        alert("Aceite os nossos termos de Privacidade para Finalizar sua compra")
      }
      
    }, 2000)    

  }
  
});

class CheckoutCustomData {
  constructor() {
    this.email = "";
    this.dataCL = {};
    this.userId = null;
    this.fields = {
      individual: {
        label: "Perfil",
        name: "Pessoa FÃ­sica",
        fieldName: "profile",
        modality: {
          professional: {
            label: "Modalidade",
            name: "Profissional",
            fieldName: "professional",
            fields: [
              {
                label: "Especialidade",
                fieldName: "specialization",
                values: [
                  { content: "Selecione", value: "" },
                  { content: "ClÃ­Â­nica Geral", value: "ClÃ­nica Geral" },
                  { content: "DentÃ­stica", value: "DentÃ­stica" },
                  { content: "Ortodontia", value: "Ortodontia" },
                  { content: "Endodontia", value: "Endodontia" },
                  { content: "Periodontia", value: "Periodontia" },
                  { content: "Bichectomia", value: "Bichectomia" },
                  { content: "Toxina BotulÃ­nica", value: "Toxina BotulÃ­nica" },
                  { content: "Estomatologia", value: "Estomatologia" },
                  { content: "Odontopediatria", value: "Odontopediatria" },
                  {
                    content: "Traumatologia Buco Maxilo Facial",
                    value: "Traumatologia Buco Maxilo Facial",
                  },
                  {
                    content: "DisfunÃ§Ã£o Mandibular",
                    value: "DisfunÃ§Ã£o Mandibular",
                  },
                  { content: "PrÃ³tese Dentaria", value: "PrÃ³tese Dentaria" },
                  { content: "SaÃºde Coletiva", value: "SaÃºde Coletiva" },
                  {
                    content: "AcadÃªmico (EspecializaÃ§Ã£o)",
                    value: "AcadÃªmico (EspecializaÃ§Ã£o)",
                  },
                  { content: "Radiologia", value: "Radiologia" },
                  {
                    content: "Medicina VeterinÃ¡ria",
                    value: "Medicina VeterinÃ¡ria",
                  },
                  { content: "Medicina", value: "Medicina" },
                  { content: "Biomedicina", value: "Biomedicina" },
                  { content: "EstÃ©tica", value: "EstÃ©tica" },
                  { content: "Agronomia", value: "Agronomia" },
                  { content: "Podologia", value: "Podologia" },
                  { content: "Outros", value: "Outros" },
                ],
                placeholder: "",
                mask: null,
              },
              {
                label: "Registro",
                fieldName: "CRONumber",
                values: [],
                placeholder: "CRO",
                mask: null,
              },
              {
                label: "Estado de registro",
                fieldName: "CROUF",
                values: [
                  { content: "Selecione", value: "" },
                  { content: "AC", value: "AC" },
                  { content: "AL", value: "AL" },
                  { content: "AP", value: "AP" },
                  { content: "AM", value: "AM" },
                  { content: "BA", value: "BA" },
                  { content: "CE", value: "CE" },
                  { content: "DF", value: "DF" },
                  { content: "ES", value: "ES" },
                  { content: "GO", value: "GO" },
                  { content: "MA", value: "MA" },
                  { content: "MT", value: "MT" },
                  {
                    content: "MS",
                    value: "MS",
                  },
                  { content: "MG", value: "MG" },
                  { content: "PA", value: "PA" },
                  { content: "PB", value: "PB" },
                  { content: "PR", value: "PR" },
                  { content: "PE", value: "PE" },
                  { content: "PI", value: "PI" },
                  { content: "RJ", value: "RJ" },
                  {
                    content: "RN",
                    value: "RN",
                  },
                  { content: "RS", value: "RS" },
                  { content: "RO", value: "RO" },
                  { content: "RR", value: "RR" },
                  { content: "SC", value: "SC" },
                  { content: "SP", value: "SP" },
                  { content: "SE", value: "SE" },
                  { content: "TO", value: "TO" },
                ],
                placeholder: "",
                mask: null,
              },
              {
                label: "Nome",
                fieldName: "firstName",
                values: [],
                placeholder: "Digite seu nome",
                mask: null,
              },
              {
                label: "Sobrenome",
                fieldName: "lastName",
                values: [],
                placeholder: "Digite se sobrenome",
                mask: null,
              },
              {
                label: "CPF",
                fieldName: "document",
                values: [],
                placeholder: "___.___.___-__",
                mask: "000.000.000-00",
              },
              {
                label: "Data de nascimento",
                fieldName: "birthDay",
                values: [],
                placeholder: "DD/MM/AAAA",
                mask: "00/00/0000",
              },
              {
                label: "Sexo",
                fieldName: "gender",
                values: [
                  { content: "Selecione", value: "" },
                  { content: "Masculino", value: "M" },
                  { content: "Feminino", value: "F" },
                ],
                placeholder: "",
                mask: null,
              },
              {
                label: "Celular",
                fieldName: "phone",
                values: [],
                placeholder: "(00) 00000-0000",
                mask: "(00) 00000-0000",
              },
            ],
          },
        },
      },
      legal: {
        label: "Perfil",
        name: "Pessoa JurÃ­dica",
        fieldName: "profile",
        modality: {
          professional: {
            name: "Profissional",
            fieldName: "professional",
            fields: [
              {
                label: "Especialidade",
                fieldName: "specialization",
                values: [
                  { content: "Selecione", value: "" },
                  { content: "ClÃ­nica Geral", value: "ClÃ­nica Geral" },
                  { content: "DentÃ­stica", value: "DentÃ­stica" },
                  { content: "Ortodontia", value: "Ortodontia" },
                  { content: "Endodontia", value: "Endodontia" },
                  { content: "Periodontia", value: "Periodontia" },
                  { content: "Bichectomia", value: "Bichectomia" },
                  { content: "Toxina BotulÃ­nica", value: "Toxina BotulÃ­nica" },
                  { content: "Estomatologia", value: "Estomatologia" },
                  { content: "Odontopediatria", value: "Odontopediatria" },
                  {
                    content: "Traumatologia Buco Maxilo Facial",
                    value: "Traumatologia Buco Maxilo Facial",
                  },
                  {
                    content: "DisfunÃ§Ã£o Mandibular",
                    value: "DisfunÃ§Ã£o Mandibular",
                  },
                  { content: "PrÃ³tese Dentaria", value: "PrÃ³tese Dentaria" },
                  { content: "SaÃºde Coletiva", value: "SaÃºde Coletiva" },
                  {
                    content: "AcadÃªmico (EspecializaÃ§Ã£o)",
                    value: "AcadÃªmico (EspecializaÃ§Ã£o)",
                  },
                  { content: "Radiologia", value: "Radiologia" },
                  {
                    content: "Medicina VeterinÃ¡ria",
                    value: "Medicina VeterinÃ¡ria",
                  },
                  { content: "Medicina", value: "Medicina" },
                  { content: "Biomedicina", value: "Biomedicina" },
                  { content: "EstÃ©tica", value: "EstÃ©tica" },
                  { content: "Agronomia", value: "Agronomia" },
                  { content: "Podologia", value: "Podologia" },
                  { content: "Outros", value: "Outros" },
                ],
                placeholder: "",
                mask: null,
              },
              {
                label: "Registro",
                fieldName: "CRONumber",
                values: [],
                placeholder: "CRO",
                mask: null,
              },
              {
                label: "ResponsÃ¡vel pela empresa",
                fieldName: "corporateResponsible",
                values: [],
                placeholder: "",
                mask: null,
              },
              {
                label: "Nome Fantasia da Empresa",
                fieldName: "tradeName",
                values: [],
                placeholder: "",
                mask: null,
              },
              {
                label: "CNPJ",
                fieldName: "corporateDocument",
                values: [],
                placeholder: "",
                mask: "00.000.000/0000-00",
              },
              {
                label: "InscriÃ§Ã£o Estadual",
                fieldName: "stateRegistration",
                values: [],
                placeholder: "",
                mask: null,
              },
              {
                label: "Isento",
                fieldName: "isento",
                values: [],
                placeholder: "",
                mask: null,
              },
              {
                label: "Estado de registro",
                fieldName: "CROUF",
                values: [
                  { content: "Selecione", value: "" },
                  { content: "Acre", value: "Acre" },
                  { content: "Alagoas", value: "Alagoas" },
                  { content: "AmapÃ¡", value: "AmapÃ¡" },
                  { content: "Amazonas", value: "Amazonas" },
                  { content: "Bahia", value: "Bahia" },
                  { content: "CearÃ¡", value: "CearÃ¡" },
                  { content: "Distrito Federal", value: "Distrito Federal" },
                  { content: "EspÃ­rito Santo", value: "EspÃ­rito Santo" },
                  { content: "GoiÃ¡s", value: "GoiÃ¡s" },
                  { content: "MaranhÃ£o", value: "MaranhÃ£o" },
                  { content: "Mato Grosso", value: "Mato Grosso" },
                  {
                    content: "Mato Grosso do Sul",
                    value: "Mato Grosso do Sul",
                  },
                  { content: "Minas Gerais", value: "Minas Gerais" },
                  { content: "ParÃ¡", value: "ParÃ¡" },
                  { content: "ParaÃ­ba", value: "ParaÃ­ba" },
                  { content: "ParanÃ¡", value: "ParanÃ¡" },
                  { content: "Pernambuco", value: "Pernambuco" },
                  { content: "PiauÃ­", value: "PiauÃ­" },
                  { content: "Rio de Janeiro", value: "Rio de Janeiro" },
                  {
                    content: "Rio Grande do Norte",
                    value: "Rio Grande do Norte",
                  },
                  { content: "Rio Grande do Sul", value: "Rio Grande do Sul" },
                  { content: "RondÃ´nia", value: "RondÃ´nia" },
                  { content: "Roraima", value: "Roraima" },
                  { content: "Santa Catarina", value: "Santa Catarina" },
                  { content: "SÃ£o Paulo", value: "SÃ£o Paulo" },
                  { content: "Sergipe", value: "Sergipe" },
                  { content: "Tocantins", value: "Tocantins" },
                ],
                placeholder: "",
                mask: null,
              },
              {
                label: "Nome",
                fieldName: "firstName",
                values: [],
                placeholder: "Digite seu nome",
                mask: null,
              },
              {
                label: "Sobrenome",
                fieldName: "lastName",
                values: [],
                placeholder: "Digite seu sobrenome",
                mask: null,
              },
              {
                label: "CPF",
                fieldName: "document",
                values: [],
                placeholder: "___.___.___-__",
                mask: "000.000.000-00",
              },
              {
                label: "Celular",
                fieldName: "phone",
                values: [],
                placeholder: "(00) 00000-0000",
                mask: "(00) 00000-0000",
              },
            ],
          },
        },
      },
    };
  }

  fetchFields = async () => {
    await vtexjs.checkout.getOrderForm();

    const email =
      this.email.length > 0
        ? this.email
        : $("#client-email").val() || $("#client-pre-email").val();

    this.email = email;

    const response = await fetch(
      `/api/dataentities/CL/search?email=${email}&_fields=id,CRONumber,firstName,lastName,gender,birthDay,modality,document,specialization,phone,profile,tradeName,CROUF,corporateDocument,corporateResponsible,email,isento`
    );

    const [json] = await response.json();

    return json || {};
  };

  buildFields = (profile, modality) => {
    const box = $(".boxInfoContainerFields");
    box.html("");
    const $t = this;

    this.fields[profile].modality[modality].fields.forEach((field) => {
      const wrapper = $("<p></p>");

      if (field.fieldName !== "isento") {
        wrapper.attr("id", field.fieldName);
        wrapper.append(`<label>${field.label}</label>`);
      }

      if (field.values.length) {
        const select = $("<select></select>");
        select.attr("id", field.fieldName);
        select.attr("name", field.fieldName);

        field.values.forEach((value) => {
          select.append(
            `<option value="${value.value}">${value.content}</option>`
          );
        });

        if (
          field.fieldName === "CROUF" ||
          field.fieldName === "gender"
        ) {
          select.attr("required", "required")
        }

        select.val($t.dataCL[field.fieldName]);
        wrapper.append(select);
      } else {
        const input = $("<input />");

        if (field.fieldName === "isento") {
          input.attr("type", "checkbox");
          input.after(
            `<label for="${field.fieldName}" class="checkbox"><span>${field.label}</span></label>`
          );
        }

        input.attr("id", field.fieldName);
        input.attr("name", field.fieldName);
        input.attr("placeholder", field.placeholder);

        if (field.mask !== null) {
          window.IMask(input[0], {
            mask: field.mask,
          });
        }

        if (field.fieldName === "isento") {
          const stateRegistration = document.querySelector("input#stateRegistration");
          //check do isento para o campo de InscriÃƒÂ§ÃƒÂ£o Estadual seja obrigatÃƒÂ³rio
          input[0].addEventListener("change",(ev) => {             
            if(ev.target.checked) {
              stateRegistration.setAttribute("required", "required");          
            } else {
              stateRegistration.removeAttribute("required");          
            }

          }) 
        } 

        if (
          field.fieldName === "document" ||
          field.fieldName === "firstName" ||
          field.fieldName === "lastName" ||
          field.fieldName === "CRONumber" ||
          field.fieldName === "birthDay" ||
          field.fieldName === "phone" ||
          field.fieldName === "corporateResponsible" ||
          field.fieldName === "tradeName" ||
          field.fieldName === "corporateDocument" 
        ) {

          input.attr("required", "required");          
        }

        if (
          field.fieldName === "document" &&
          $t.dataCL[field.fieldName] !== undefined &&
          $t.dataCL[field.fieldName] !== null
        ) {
          input.val(
            $t.dataCL[field.fieldName].replace(/-/, ".").replace(/-/, ".")
          );
        } else {
          input.val($t.dataCL[field.fieldName]);
        }

        if (field.fieldName === "isento") {
          input.val("Sim");

          if ($t.dataCL[field.fieldName] === "Sim") {
            input.prop("checked", true);
          }
        }

        wrapper.append(input);
      }

      box.append(wrapper);
      $("boxInfoContainer").validate();
    });
  };

  buildProfileFields = (profile) => {
    const $t = this;
    const box = $(".boxInfoContainerProfileFields");

    box.html("");
    $(".boxInfoContainerFields").html("");

    $t.buildFields(profile, "professional");
  };

  validateCPF = () => {
    const checkCPFValid = vtex.validation.validateDocument(
      $("input#document").val()
    );

    if (!checkCPFValid.result) {
      alert("Informe um CPF vÃ¡lido.");
      return false;
    }

    return true;
  };

  validateCNPJ = () => {
    const checkCPFValid = vtex.validation.validateCNPJ(
      $("input#corporateDocument").val()
    );

    if (!checkCPFValid.result) {
      alert("Informe um CNPJ vÃ¡lido.");
      return false;
    }

    return true;
  };

  validatePhone = () => {
    const checkValidatePhone = $("input#phone").val();

    if (checkValidatePhone.length < 15) {
      alert("Informe um Telefone vÃ¡lido.");
      return false;
    }

    return true;
  }

  updateUser = async (dataSend) => {
    
    const response = await fetch(
      `/api/dataentities/CL/documents/${this.userId}`,
      {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataSend),
      }
    );

    return response;
  };

  createUser = async (dataSend) => {

    const response = await fetch(`/api/dataentities/CL/documents`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataSend),
    });

    return response.json();
  };

  saveInOrderForm = async (dataSend) => {
    const orderForm = await vtexjs.checkout.getOrderForm();

    const clientProfileData = {
      ...orderForm.clientProfileData,
      ...dataSend,
    };

    return vtexjs.checkout.sendAttachment(
      "clientProfileData",
      clientProfileData
    );
  };

  sendCustomData = async (dataSend) => {

    if (Object.keys(dataSend).length === 0 || (dataSend.gender && dataSend.gender == "") ) return;

    for (var prop in dataSend) {
      if (dataSend[prop] == undefined || dataSend[prop] == "" || dataSend[prop] == null) {
          delete dataSend[prop];
        }
    }

    fetch(
      `/api/checkout/pub/orderForm/${vtexjs.checkout.orderForm.orderFormId}/customData/new_custom_fields`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          'CRONumber': dataSend.CRONumber,
          'CROUF': dataSend.CROUF,
          'birthDay': dataSend.birthDay,
          'document': dataSend.document,
          'firstName': dataSend.firstName,
          'email': dataSend.email,
          'profile': dataSend.profile,
          'specialization': dataSend.specialization,
          'gender': dataSend.gender,
          'phone': dataSend.phone
        }),
      }
    ).then( resp => resp.json()) 
    .then( json => json)

  };

  sendForm = async () => {
    if ($(".boxInfoContainer").valid() && this.validateCPF()) {
      if ($("input#corporateDocument").length && !this.validateCNPJ()) return;

      if (!this.validatePhone()) return;

      $(".boxInfoContainer").addClass("b8-loading");

      const dataSend = {};

      $(".boxInfoContainer input, .boxInfoContainer select").map(function () {
        const $t = $(this);

        if (
          $t.attr("id") === "document" ||
          $t.attr("id") === "corporateDocument"
        ) {
          dataSend[$t.attr("id")] = $t.val().replace(/[\.\-\/\(\)\s]/g, "");
        } else {
          dataSend[$t.attr("id")] = $t.val();
        }
      });

      if (this.userId) {
        await this.updateUser(dataSend);
      } else {
        const { DocumentId } = await this.createUser(dataSend);
        this.userId = DocumentId;
        await this.updateUser(dataSend);
      }

      await this.saveInOrderForm(dataSend);
      await this.sendCustomData(dataSend);

      $(".boxInfoContainer").removeClass("b8-loading");
      location.hash = "#/shipping";
      location.reload();
    }
  };

  appendFields = (data) => {
    this.dataCL = data;

    const container = $(".boxInfoContainer");
    container.html("");

    container.append(
      `<p id="email"> <label>E-mail</label> <input id="email" name="email" type="text" placeholder="Digite seu e-mail" value="${this.email}" /> </p> <p id="profile"> <label>Perfil</label> <select id="profile" name="profile" class="profile"> <option value="individual" selected>Pessoa FÃ­sica</option> <option value="legal">Pessoa JurÃ­dica</option> </select> </p> <div class="boxInfoContainerProfileFields"></div> <div class="boxInfoContainerFields"></div><button class="go-to-shipping" class="submit btn btn-large btn-success">Ir para a Entrega</button>`
    );

    const $t = this;

    const selectProfile = $("select.profile");
    selectProfile.val(data.profile);
    selectProfile.on("change", function () {
      $t.buildProfileFields(this.value);
    });
    $t.buildProfileFields(selectProfile.val());

    $("#email input").on("change", function () {
      $t.email = this.value;
      $t.build();
    });

    $(".boxInfoContainer .go-to-shipping").click(function (evt) {
      evt.preventDefault();

      $t.sendForm();
    });
  };

  build = () => {
    const $t = this;

    $(".boxInfoContainer").addClass("b8-loading");

    $t.fetchFields().then((data) => {

      if (data.id) {
        this.userId = data.id;
      }

      vtexjs.checkout
        .getOrderForm()
        .then(function (orderForm) {
          const { clientProfileData } = orderForm;

          if (data.email && data.CRONumber && data.CROUF ) {

            for (var prop in data) {
              if (data[prop] == undefined || data[prop] == "" || data[prop] == null) {
                  delete data[prop];
                }
            }

            return vtexjs.checkout.sendAttachment("clientProfileData", {
              ...clientProfileData,
              ...data,
            });
            
          }

          ///nÃƒÂ£o pode enviar o email vazio
          if ($t.email != "") {

            return vtexjs.checkout.sendAttachment("clientProfileData", {
              email: $t.email,
              firstName: null,
              lastName: null,
              document: null,
              documentType: null,
              phone: null,
              corporateName: null,
              tradeName: null,
              corporateDocument: null,
              stateInscription: null,
              corporatePhone: null,
              isCorporate: false,
              profileCompleteOnLoading: false,
              profileErrorOnLoading: false,
              customerClass: null,
            });
          }
          
        })
        .done(function (orderForm) {
          $(".boxInfoContainer").removeClass("b8-loading");
          $t.appendFields(data);
        });
    });
  };


  buildFieldsInfo = () => {

    const $t = this;

    $(".boxInfoContainer").addClass("b8-loading");

    $t.fetchFields().then( async (data) => {
      $t.dataCL = data;

      await $t.sendCustomData(data)

      const box = $(".boxInfoContainer-info");
      box.html("");

      box.append(
        `
        <p>
          <strong>Perfil</strong>
          <p>
          ${this.fields[data.profile || "individual"].name}
          </p>
        </p>
        <p>
          <strong>Modalidade</strong>
          <p>
          ${
            this.fields[data.profile || "individual"].modality[
              data.modality || "professional"
            ].name
          }
          </p>
        </p>
        `
      );

      this.fields[data.profile || "individual"].modality[
        data.modality || "professional"
      ].fields.forEach((field) => {
        const wrapper = $("<p></p>");

        wrapper.attr("id", field.fieldName);
        wrapper.append(`<strong>${field.label}</strong>`);
        wrapper.append(`
            <p>
              ${$t.dataCL[field.fieldName]}
            </p>
        `);

        if(!$t.dataCL[field.fieldName]) { 
          wrapper.addClass("error-field-empty");

          handleCustomDataEmpty();

        }

        box.append(wrapper);
      });
      
    });
  };
}

const checkoutCustomData = new CheckoutCustomData();

function handlePopUpValorMinimo() {
  const btn = document.querySelector(".pop-min-value__container > button");
  const btnClose = document.querySelector(".pop-min-value__close");
  const container = document.querySelector(".pop-min-value");

  btn.addEventListener("click", handle)
  btnClose.addEventListener("click", handle)

  function handle(ev) {
   ev.preventDefault();
   container.classList.add("hidden"); 
  }
}

async function getUserLogin() {
  
  const resp = await fetch("/api/vtexid/pub/authenticated/user")
  const json = await resp.json();

  return json;

}

function handleCustomDataEmpty() {

  if (debounceCustomDataEmpty == 0 && window.location.hash != "#/cart" && window.location.hash != "#/email") {

    setTimeout( () => {

      const btnEdit = document.querySelector(".client-profile-data .link-box-edit.btn");

      getUserLogin().then( resp => {

        if (!resp) {

          alert("Existe campo de Dados Pessoais vazio. FaÃ§a o login e preencha corretamente o cadastro ");

          if ($(btnEdit)[0]) {
            $(btnEdit)[0].click();
          } else {
            $(btnEdit).click();
          }

        } else {

          alert("Algum campo de Dados Pessoais estÃ¡ vazio. Preencha corretamente o cadastro");
          window.location.hash = "#/profile";

        }

      })

    }, 3000);

    debounceCustomDataEmpty ++;
    
  }
  
}

function  verifyPopUpValorMinimo() {
  // const container = document.querySelector(".pop-min-value");

  try {
    const container = document.querySelector(".header__top-bar");
    const tot = parseFloat(document.querySelector(".summary-totalizers.cart-totalizers .monetary").innerText.replace("R$", "").trim()?.replace(",", "."))
    const totFormatCurrency = new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(100 - tot);

    if (tot < 100) {
      container?.classList.remove("hidden");
      container?.classList.add("active");
      container.querySelector("p").innerText = `FALTAM ${totFormatCurrency} PARA VOCÃŠ GANHAR FRETE GRÃTIS`

    } else {
      container.querySelector("p").innerText = `FALTAM R$99,00 PARA VOCÃŠ GANHAR FRETE GRÃTIS`
      container?.classList.remove("active");
      container?.classList.add("hidden");
    }  
  } catch (error) {

    console.log({
      error
    })

  }
  
}

function handleFormatQuantity() {
    $(".new-product-real-price-per-unit").each(function() {
        var text = $(this).text();
        text = text.replace("CX", "UN");
        $(this).text(text);
    });
    
    $(".item-unit-label").each(function() {
        var text = $(this).text();
        text = text.replace("CX", "UN");
        $(this).text(text);
    });
}

function handleFreight() {
    let checkCalculate = $('.srp-delivery-select').val();

    if (checkCalculate >= 0) {
        $('.srp-summary-result').removeClass('off')
    } else {
        $('.srp-summary-result').addClass('off')
    }
}

$(document).ready(function () {
  $.get("https://unpkg.com/imask@6.0.5/dist/imask.js").done(
    (imask) => (window.Imask = imask)
  );

  $(".client-profile-data .accordion-inner").after(
    `<form class="boxInfoContainer"></form>`
  );

  if (location.hash === "#/profile") {
    checkoutCustomData.build();
  } else {
    $(".boxInfoContainer").remove();
    $(".boxInfoContainer-info").remove();
    $(".client-profile-data .accordion-inner").after(
      `<form class="boxInfoContainer"></form><div class="boxInfoContainer-info"></div>`
    );
    checkoutCustomData.buildFieldsInfo();
  }

  if (location.hash == "#/cart") {

    setTimeout( () => addListenerSucessRequest(), 3000);

  }  

  
  setInterval(function() {
      if($(document).find(".new-product-real-price-per-unit")) {
          handleFormatQuantity()
          handleFreight();
    }
}, 10)

});

function addListenerSucessRequest() {

  verifyPopUpValorMinimo();

  $(document).ajaxSuccess(function() {

    if (location.hash == "#/cart") {
      verifyPopUpValorMinimo();
    }
    
  });

}

$(window).on("hashchange", function () {


  if (location.hash === "#/profile") {
    checkoutCustomData.build();
  
  } else {
    $(".boxInfoContainer").remove();
    $(".boxInfoContainer-info").remove();
    $(".client-profile-data .accordion-inner").after(
      `<form class="boxInfoContainer"></form><div class="boxInfoContainer-info"></div>`
    );
    checkoutCustomData.buildFieldsInfo();
  }  

  if (window.location.hash == "#/payment") {

    setTimeout( () => {
    
      const checkboxElement = document.querySelector('.terms__checkbox');
  
      if (checkboxElement && checkboxElement.checked === false && debounce == 0)  {
        debounce++;
        alert("Aceite os nossos termos de Privacidade para Finalizar sua compra")
      }
      
    }, 2000)    

  }

  //verificando recorrente(por cada troca de steps) se o customData estÃƒÂ¡ totalmente preenchido
  if (window.location.hash == "#/payment" || window.location.hash == "#/shipping") {
    
    const customData = vtexjs.checkout.orderForm?.customData?.customApps[0];

    if (customData && (!customData.fields.phone || !customData.fields.gender || !customData.fields.CRONumber || !customData.fields.CROUF || !customData.fields.birthDay || !customData.fields.document || !customData.fields.specialization || !customData.fields.profile ) ) {
      debounceCustomDataEmpty = 0;
      handleCustomDataEmpty();
    }
    
  }

});

// $(document).ajaxComplete(function() {
  
//   const container = document.querySelector(".cart-select-gift-placeholder");
//   const container_html = container.innerHTML;
  
//   if(vtexjs.checkout?.orderForm?.marketingData?.coupon != null ) {
//       if (container_html != "") {
//           setTimeout( () => {
//               container.innerHTML = container_html;
//           }, 2500);       
//       }              
//   }

// });


/*! jQuery Validation Plugin - v1.19.1 - 6/15/2019
 * https://jqueryvalidation.org/
 * Copyright (c) 2019 JÃƒÂ¶rn Zaefferer; Licensed MIT */
eval(
  (function (p, a, c, k, e, d) {
    e = function (c) {
      return (
        (c < a ? "" : e(parseInt(c / a))) +
        ((c %= a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
      );
    };
    if (!"".replace(/^/, String)) {
      while (c--) {
        d[e(c)] = k[c] || e(c);
      }
      k = [
        function (e) {
          return d[e];
        },
      ];
      e = function () {
        return "\\w+";
      };
      c = 1;
    }
    while (c--) {
      if (k[c]) {
        p = p.replace(new RegExp(`\\b${e(c)}\\b`, "g"), k[c]);
      }
    }
    return p;
  })(
    '!8(a){"8"==D 3e&&3e.5t?3e(["4e"],a):"5c"==D 2Y&&2Y.4f?2Y.4f=a(6m("4e")):a(5U)}(8(a){a.G(a.47,{w:8(b){E(!7.A)n Q(b&&b.1M&&2A.1t&&1t.4Z("5V 56, 5W\'t w, 5O 5X."));u c=a.T(7[0],"v");n c?c:(7.y("4d","4d"),c=23 a.v(b,7[0]),a.T(7[0],"v",c),c.p.4k&&(7.1d("44.w",":2D",8(b){c.1N=b.63,a(7).5Z("6f")&&(c.2y=!0),Q 0!==a(7).y("62")&&(c.2y=!0)}),7.1d("2D.w",8(b){8 d(){u d,e;n c.1N&&(c.p.3q||c.1s)&&(d=a("<2o x=\'3s\'/>").y("q",c.1N.q).1e(a(c.1N).1e()).60(c.F)),!(c.p.3q&&!c.p.1M)||(e=c.p.3q.Y(c,c.F,b),d&&d.3p(),Q 0!==e&&e)}n c.p.1M&&b.67(),c.2y?(c.2y=!1,d()):c.B()?c.1n?(c.1s=!0,!1):d():(c.2v(),!1)})),c)},P:8(){u b,c,d;n a(7[0]).1L("B")?b=7.w().B():(d=[],b=!0,c=a(7[0].B).w(),7.V(8(){b=c.L(7)&&b,b||(d=d.66(c.U))}),c.U=d),b},1m:8(b,c){u d,e,f,g,h,i,j=7[0],k="2k"!=D 7.y("1b")&&"2M"!==7.y("1b");E(15!=j&&(!j.B&&k&&(j.B=7.3k("B")[0],j.q=7.y("q")),15!=j.B)){E(b)3y(d=a.T(j.B,"v").p,e=d.1m,f=a.v.32(j),b){1R"1A":a.G(f,a.v.2c(c)),N f.I,e[j.q]=f,c.I&&(d.I[j.q]=a.G(d.I[j.q],c.I));4V;1R"3p":n c?(i={},a.V(c.1S(/\\s/),8(a,b){i[b]=f[b],N f[b]}),i):(N e[j.q],f)}n g=a.v.4U(a.G({},a.v.4T(j),a.v.4Q(j),a.v.4P(j),a.v.32(j)),j),g.13&&(h=g.13,N g.13,g=a.G({13:h},g)),g.1q&&(h=g.1q,N g.1q,g=a.G(g,{1q:h})),g}}}),a.G(a.4c.65||a.4c[":"],{5R:8(b){n!a.4g(""+a(b).1e())},5Q:8(b){u c=a(b).1e();n 15!==c&&!!a.4g(""+c)},5P:8(b){n!a(b).5S("3w")}}),a.v=8(b,c){7.p=a.G(!0,{},a.v.3r,b),7.F=c,7.3Z()},a.v.1a=8(b,c){n 1===1g.A?8(){u c=a.4h(1g);n c.5T(b),a.v.1a.3G(7,c)}:Q 0===c?b:(1g.A>2&&c.2p!==4l&&(c=a.4h(1g).6l(1)),c.2p!==4l&&(c=[c]),a.V(c,8(a,c){b=b.1E(23 2X("\\\\{"+a+"\\\\}","g"),8(){n c})}),b)},a.G(a.v,{3r:{I:{},1p:{},1m:{},1f:"2Z",3v:"1H",1G:"P",3i:"2r",4j:!1,2v:!0,3Y:a([]),3A:a([]),4k:!0,2B:":3s",4v:!1,6o:8(a){7.4B=a,7.p.4j&&(7.p.1F&&7.p.1F.Y(7,a,7.p.1f,7.p.1G),7.34(7.28(a)))},3J:8(a){7.1T(a)||!(a.q H 7.1v)&&7.K(a)||7.L(a)},6q:8(b,c){u d=[16,17,18,20,35,36,37,38,39,40,45,6p,6i];9===c.4K&&""===7.2N(b)||a.6c(c.6b,d)!==-1||(b.q H 7.1v||b.q H 7.J)&&7.L(b)},6a:8(a){a.q H 7.1v?7.L(a):a.4i.q H 7.1v&&7.L(a.4i)},31:8(b,c,d){"1Y"===b.x?7.1j(b.q).1c(c).X(d):a(b).1c(c).X(d)},1F:8(b,c,d){"1Y"===b.x?7.1j(b.q).X(c).1c(d):a(b).X(c).1c(d)}},6h:8(b){a.G(a.v.3r,b)},I:{13:"5N 4b 1L 13.",1q:"M 6s 7 4b.",1W:"M W a P 1W 5n.",27:"M W a P 5m.",1w:"M W a P 1w.",2a:"M W a P 1w (5l).",1h:"M W a P 1h.",2s:"M W 5o 2s.",1o:"M W 2j 5p 2f 5s.",1k:a.v.1a("M W 4F 5r 3x {0} 3o."),1U:a.v.1a("M W 5k 5d {0} 3o."),2R:a.v.1a("M W a 2f 4a {0} 2V {1} 3o 5e."),1l:a.v.1a("M W a 2f 4a {0} 2V {1}."),1K:a.v.1a("M W a 2f 5i 3x 3b 42 41 {0}."),1X:a.v.1a("M W a 2f 5g 3x 3b 42 41 {0}."),3n:a.v.1a("M W a 5I 4Y {0}.")},52:!1,5J:{3Z:8(){8 b(b){u c="2k"!=D a(7).y("1b")&&"2M"!==a(7).y("1b");E(!7.B&&c&&(7.B=a(7).3k("B")[0],7.q=a(7).y("q")),d===7.B){u e=a.T(7.B,"v"),f="1d"+b.x.1E(/^w/,""),g=e.p;g[f]&&!a(7).1L(g.2B)&&g[f].Y(e,7,b)}}7.2t=a(7.p.3A),7.4J=7.2t.A&&7.2t||a(7.F),7.2l=a(7.p.3Y).1A(7.p.3A),7.1v={},7.5K={},7.1n=0,7.1H={},7.J={},7.2g();u c,d=7.F,e=7.1p={};a.V(7.p.1p,8(b,c){"19"==D c&&(c=c.1S(/\\s/)),a.V(c,8(a,c){e[c]=b})}),c=7.p.1m,a.V(c,8(b,d){c[b]=a.v.2c(d)}),a(7.F).1d("4D.w 5E.w 5D.w",":1Q, [x=\'5x\'], [x=\'4G\'], 2d, 4E, [x=\'1h\'], [x=\'5w\'], [x=\'5v\'], [x=\'27\'], [x=\'1W\'], [x=\'43\'], [x=\'1w\'], [x=\'5y\'], [x=\'5z\'], [x=\'5C\'], [x=\'43-5B\'], [x=\'1l\'], [x=\'5A\'], [x=\'1Y\'], [x=\'2w\'], [1b], [x=\'5M\']",b).1d("44.w","2d, 5a, [x=\'1Y\'], [x=\'2w\']",b),7.p.49&&a(7.F).1d("J-B.w",7.p.49)},B:8(){n 7.48(),a.G(7.1v,7.1y),7.J=a.G({},7.1y),7.P()||a(7.F).57("J-B",[7]),7.1J(),7.P()},48:8(){7.3g();O(u a=0,b=7.2i=7.3a();b[a];a++)7.24(b[a]);n 7.P()},L:8(b){u c,d,e=7.2F(b),f=7.2L(e),g=7,h=!0;n Q 0===f?N 7.J[e.q]:(7.4I(f),7.2i=a(f),d=7.1p[f.q],d&&a.V(7.1p,8(a,b){b===d&&a!==f.q&&(e=g.2L(g.2F(g.1j(a))),e&&e.q H g.J&&(g.2i.2P(e),h=g.24(e)&&h))}),c=7.24(f)!==!1,h=h&&c,c?7.J[f.q]=!1:7.J[f.q]=!0,7.46()||(7.14=7.14.1A(7.2l)),7.1J(),a(b).y("1Z-J",!c)),h},1J:8(b){E(b){u c=7;a.G(7.1y,b),7.U=a.3h(7.1y,8(a,b){n{1r:a,L:c.1j(b)[0]}}),7.1C=a.4A(7.1C,8(a){n!(a.q H b)})}7.p.1J?7.p.1J.Y(7,7.1y,7.U):7.3I()},2G:8(){a.47.2G&&a(7.F).2G(),7.J={},7.1v={},7.3g(),7.3c();u b=7.3a().59("29").6j("1Z-J");7.3t(b)},3t:8(a){u b;E(7.p.1F)O(b=0;a[b];b++)7.p.1F.Y(7,a[b],7.p.1f,""),7.1j(a[b].q).X(7.p.1G);6w a.X(7.p.1f).X(7.p.1G)},46:8(){n 7.2J(7.J)},2J:8(a){u b,c=0;O(b H a)Q 0!==a[b]&&15!==a[b]&&a[b]!==!1&&c++;n c},3c:8(){7.34(7.14)},34:8(a){a.1i(7.2l).1Q(""),7.3f(a).3U()},P:8(){n 0===7.4m()},4m:8(){n 7.U.A},2v:8(){E(7.p.2v)4y{a(7.4C()||7.U.A&&7.U[0].L||[]).2n(":7f").4n("76").4n("4D")}4r(b){}},4C:8(){u b=7.4B;n b&&1===a.4A(7.U,8(a){n a.L.q===b.q}).A&&b},3a:8(){u b=7,c={};n a(7.F).1z("2o, 2d, 4E, [1b]").1i(":2D, :2g, :77, :78").1i(7.p.2B).2n(8(){u d=7.q||a(7).y("q"),e="2k"!=D a(7).y("1b")&&"2M"!==a(7).y("1b");n!d&&b.p.1M&&2A.1t&&1t.2Z("%o 7a 4F q 75",7),e&&(7.B=a(7).3k("B")[0],7.q=d),7.B===b.F&&(!(d H c||!b.2J(a(7).1m()))&&(c[d]=!0,!0))})},2F:8(b){n a(b)[0]},3E:8(){u b=7.p.1f.1S(" ").3O(".");n a(7.p.3i+"."+b,7.4J)},30:8(){7.1C=[],7.U=[],7.1y={},7.1B=a([]),7.14=a([])},2g:8(){7.30(),7.2i=a([])},3g:8(){7.2g(),7.14=7.3E().1A(7.2l)},4I:8(a){7.2g(),7.14=7.28(a)},2N:8(b){u c,d,e=a(b),f=b.x,g="2k"!=D e.y("1b")&&"2M"!==e.y("1b");n"1Y"===f||"2w"===f?7.1j(b.q).2n(":3w").1e():"1h"===f&&"2k"!=D b.4H?b.4H.7j?"51":e.1e():(c=g?e.1Q():e.1e(),"4G"===f?"C:\\\\72\\\\"===c.2H(0,12)?c.2H(12):(d=c.4z("/"),d>=0?c.2H(d+1):(d=c.4z("\\\\"),d>=0?c.2H(d+1):c)):"19"==D c?c.1E(/\\r/g,""):c)},24:8(b){b=7.2L(7.2F(b));u c,d,e,f,g=a(b).1m(),h=a.3h(g,8(a,b){n b}).A,i=!1,j=7.2N(b);"8"==D g.1V?f=g.1V:"8"==D 7.p.1V&&(f=7.p.1V),f&&(j=f.Y(b,j),N g.1V);O(d H g){e={R:d,2h:g[d]};4y{E(c=a.v.1u[d].Y(7,j,b,e.2h),"2S-2T"===c&&1===h){i=!0;6D}E(i=!1,"1H"===c)n Q(7.14=7.14.1i(7.28(b)));E(!c)n 7.3Q(b,e),!1}4r(k){3K 7.p.1M&&2A.1t&&1t.6G("4q 3X 4p 4o L "+b.21+", 24 2j \'"+e.R+"\' R.",k),k 6H 6J&&(k.1r+=".  4q 3X 4p 4o L "+b.21+", 24 2j \'"+e.R+"\' R."),k}}E(!i)n 7.2J(g)&&7.1C.2P(b),!0},4w:8(b,c){n a(b).T("4s"+c.4M(0).4N()+c.4O(1).2K())||a(b).T("4s")},4x:8(a,b){u c=7.p.I[a];n c&&(c.2p===4S?c:c[b])},4t:8(){O(u a=0;a<1g.A;a++)E(Q 0!==1g[a])n 1g[a]},2C:8(b,c){"19"==D c&&(c={R:c});u d=7.4t(7.4x(b.q,c.R),7.4w(b,c.R),!7.p.4v&&b.6x||Q 0,a.v.I[c.R],"<4u>6y: 6A 1r 6z O "+b.q+"</4u>"),e=/\\$?\\{(\\d+)\\}/g;n"8"==D d?d=d.Y(7,c.2h,b):e.11(d)&&(d=a.v.1a(d.1E(e,"{$1}"),c.2h)),d},3Q:8(a,b){u c=7.2C(a,b);7.U.2P({1r:c,L:a,R:b.R}),7.1y[a.q]=c,7.1v[a.q]=c},3f:8(a){n 7.p.2x&&(a=a.1A(a.3P(7.p.2x))),a},3I:8(){u a,b,c;O(a=0;7.U[a];a++)c=7.U[a],7.p.31&&7.p.31.Y(7,c.L,7.p.1f,7.p.1G),7.3j(c.L,c.1r);E(7.U.A&&(7.1B=7.1B.1A(7.2l)),7.p.26)O(a=0;7.1C[a];a++)7.3j(7.1C[a]);E(7.p.1F)O(a=0,b=7.3W();b[a];a++)7.p.1F.Y(7,b[a],7.p.1f,7.p.1G);7.14=7.14.1i(7.1B),7.3c(),7.3f(7.1B).3V()},3W:8(){n 7.2i.1i(7.3S())},3S:8(){n a(7.U).3h(8(){n 7.L})},3j:8(b,c){u d,e,f,g,h=7.28(b),i=7.3u(b),j=a(b).y("1Z-2I");h.A?(h.X(7.p.1G).1c(7.p.1f),h.3T(c)):(h=a("<"+7.p.3i+">").y("21",i+"-2Z").1c(7.p.1f).3T(c||""),d=h,7.p.2x&&(d=h.3U().3V().71("<"+7.p.2x+"/>").3P()),7.2t.A?7.2t.70(d):7.p.3L?7.p.3L.Y(7,d,a(b)):d.6U(b),h.1L("2r")?h.y("O",i):0===h.6T("2r[O=\'"+7.1I(i)+"\']").A&&(f=h.y("21"),j?j.3N(23 2X("\\\\b"+7.1I(f)+"\\\\b"))||(j+=" "+f):j=f,a(b).y("1Z-2I",j),e=7.1p[b.q],e&&(g=7,a.V(g.1p,8(b,c){c===e&&a("[q=\'"+g.1I(b)+"\']",g.F).y("1Z-2I",h.y("21"))})))),!c&&7.p.26&&(h.1Q(""),"19"==D 7.p.26?h.1c(7.p.26):7.p.26(h,b)),7.1B=7.1B.1A(h)},28:8(b){u c=7.1I(7.3u(b)),d=a(b).y("1Z-2I"),e="2r[O=\'"+c+"\'], 2r[O=\'"+c+"\'] *";n d&&(e=e+", #"+7.1I(d).1E(/\\s+/g,", #")),7.3E().2n(e)},1I:8(a){n a.1E(/([\\\\!"#$%&\'()*+,.\\/:;<=>?@\\[\\]^`{|}~])/g,"\\\\$1")},3u:8(a){n 7.1p[a.q]||(7.1T(a)?a.q:a.21||a.q)},2L:8(b){n 7.1T(b)&&(b=7.1j(b.q)),a(b).1i(7.p.2B)[0]},1T:8(a){n/1Y|2w/i.11(a.x)},1j:8(b){n a(7.F).1z("[q=\'"+7.1I(b)+"\']")},2q:8(b,c){3y(c.4X.2K()){1R"2d":n a("5a:56",c).A;1R"2o":E(7.1T(c))n 7.1j(c.q).2n(":3w").A}n b.A},4W:8(a,b){n!7.3F[D a]||7.3F[D a](a,b)},3F:{"6Q":8(a){n a},19:8(b,c){n!!a(b,c.B).A},"8":8(a,b){n a(b)}},K:8(b){u c=7.2N(b);n!a.v.1u.13.Y(7,c,b)&&"2S-2T"},4L:8(b){7.1H[b.q]||(7.1n++,a(b).1c(7.p.3v),7.1H[b.q]=!0)},3H:8(b,c){7.1n--,7.1n<0&&(7.1n=0),N 7.1H[b.q],a(b).X(7.p.3v),c&&0===7.1n&&7.1s&&7.B()?(a(7.F).2D(),7.1N&&a("2o:3s[q=\'"+7.1N.q+"\']",7.F).3p(),7.1s=!1):!c&&0===7.1n&&7.1s&&(a(7.F).57("J-B",[7]),7.1s=!1)},29:8(b,c){n c="19"==D c&&c||"1q",a.T(b,"29")||a.T(b,"29",{3C:15,P:!0,1r:7.2C(b,{R:c})})},6N:8(){7.2G(),a(7.F).1O(".w").59("v").1z(".w-1o-Z").1O(".w-1o").X("w-1o-Z").1z(".w-3B-Z").1O(".w-3B").X("w-3B-Z").1z(".w-3m-Z").1O(".w-3m").X("w-3m-Z").1z(".w-3l-Z").1O(".w-3l").X("w-3l-Z").1z(".w-2W-Z").1O(".w-2W").X("w-2W-Z")}},2m:{13:{13:!0},1W:{1W:!0},27:{27:!0},1w:{1w:!0},2a:{2a:!0},1h:{1h:!0},2s:{2s:!0},4R:{4R:!0}},53:8(b,c){b.2p===4S?7.2m[b]=c:a.G(7.2m,b)},4T:8(b){u c={},d=a(b).y("6Z");n d&&a.V(d.1S(" "),8(){7 H a.v.2m&&a.G(c,a.v.2m[7])}),c},33:8(a,b,c,d){/1X|1K|3n/.11(c)&&(15===b||/1h|1l|1Q/.11(b))&&(d=1P(d),6Y(d)&&(d=Q 0)),d||0===d?a[c]=d:b===c&&"1l"!==b&&(a[c]=!0)},4Q:8(b){u c,d,e={},f=a(b),g=b.3z("x");O(c H a.v.1u)"13"===c?(d=b.3z(c),""===d&&(d=!0),d=!!d):d=f.y(c),7.33(e,g,c,d);n e.1k&&/-1|6V|6W/.11(e.1k)&&N e.1k,e},4P:8(b){u c,d,e={},f=a(b),g=b.3z("x");O(c H a.v.1u)d=f.T("6X"+c.4M(0).4N()+c.4O(1).2K()),""===d&&(d=!0),7.33(e,g,c,d);n e},32:8(b){u c={},d=a.T(b.B,"v");n d.p.1m&&(c=a.v.2c(d.p.1m[b.q])||{}),c},4U:8(b,c){n a.V(b,8(d,e){E(e===!1)n Q N b[d];E(e.2Q||e.2z){u f=!0;3y(D e.2z){1R"19":f=!!a(e.2z,c.B).A;4V;1R"8":f=e.2z.Y(c,c)}f?b[d]=Q 0===e.2Q||e.2Q:(a.T(c.B,"v").3t(a(c)),N b[d])}}),a.V(b,8(d,e){b[d]=a.6u(e)&&"1V"!==d?e(c):e}),a.V(["1U","1k"],8(){b[7]&&(b[7]=1P(b[7]))}),a.V(["2R","1l"],8(){u c;b[7]&&(a.2O(b[7])?b[7]=[1P(b[7][0]),1P(b[7][1])]:"19"==D b[7]&&(c=b[7].1E(/[\\[\\]]/g,"").1S(/[\\s,]+/),b[7]=[1P(c[0]),1P(c[1])]))}),a.v.52&&(15!=b.1X&&15!=b.1K&&(b.1l=[b.1X,b.1K],N b.1X,N b.1K),15!=b.1U&&15!=b.1k&&(b.2R=[b.1U,b.1k],N b.1U,N b.1k)),b},2c:8(b){E("19"==D b){u c={};a.V(b.1S(/\\s/),8(){c[7]=!0}),b=c}n b},6E:8(b,c,d){a.v.1u[b]=c,a.v.I[b]=Q 0!==d?d:a.v.I[b],c.A<3&&a.v.53(b,a.v.2c(b))},1u:{13:8(b,c,d){E(!7.4W(d,c))n"2S-2T";E("2d"===c.4X.2K()){u e=a(c).1e();n e&&e.A>0}n 7.1T(c)?7.2q(b,c)>0:Q 0!==b&&15!==b&&b.A>0},1W:8(a,b){n 7.K(b)||/^[a-1x-1D-9.!#$%&\'*+\\/=?^7d`{|}~-]+@[a-1x-1D-9](?:[a-1x-1D-9-]{0,61}[a-1x-1D-9])?(?:\\.[a-1x-1D-9](?:[a-1x-1D-9-]{0,61}[a-1x-1D-9])?)*$/.11(a)},27:8(a,b){n 7.K(b)||/^(?:(?:(?:79?|7e):)?\\/\\/)(?:\\S+(?::\\S*)?@)?(?:(?!(?:10|7h)(?:\\.\\d{1,3}){3})(?!(?:7o\\.6t|5q\\.5j)(?:\\.\\d{1,3}){2})(?!5H\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})(?:[1-9]\\d?|1\\d\\d|2[54]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\2e-\\2u-9]-*)*[a-z\\2e-\\2u-9]+)(?:\\.(?:[a-z\\2e-\\2u-9]-*)*[a-z\\2e-\\2u-9]+)*(?:\\.(?:[a-z\\2e-\\5F]{2,})).?)(?::\\d{2,5})?(?:[\\/?#]\\S*)?$/i.11(a)},1w:8(){u a=!1;n 8(b,c){n a||(a=!0,7.p.1M&&2A.1t&&1t.4Z("5G `1w` R 1L 6d 2V 6r 6n 6k H 68 \'2.0.0\'.\\5Y 64\'t 69 58, 6e 58 5b 1d 2j 55 2p, 4K\\6g 5f 5h 5u 5L 2V 7c. 7b `2a`\\7l 3b 74 4Y 2j 7g 7n 1u H `7i/`\\6I `6C-1u.73`.")),7.K(c)||!/6v|51/.11(23 55(b).6K())}}(),2a:8(a,b){n 7.K(b)||/^\\d{4}[\\/\\-](0?[1-9]|1[6L])[\\/\\-](0?[1-9]|[12][0-9]|3[54])$/.11(a)},1h:8(a,b){n 7.K(b)||/^(?:-?\\d+|-?\\d{1,3}(?:,\\d{3})+)?(?:\\.\\d+)?$/.11(a)},2s:8(a,b){n 7.K(b)||/^\\d+$/.11(a)},1U:8(b,c,d){u e=a.2O(b)?b.A:7.2q(b,c);n 7.K(c)||e>=d},1k:8(b,c,d){u e=a.2O(b)?b.A:7.2q(b,c);n 7.K(c)||e<=d},2R:8(b,c,d){u e=a.2O(b)?b.A:7.2q(b,c);n 7.K(c)||e>=d[0]&&e<=d[1]},1X:8(a,b,c){n 7.K(b)||a>=c},1K:8(a,b,c){n 7.K(b)||a<=c},1l:8(a,b,c){n 7.K(b)||a>=c[0]&&a<=c[1]},3n:8(b,c,d){u e,f=a(c).y("x"),g="6M 6R 1d 2o x "+f+" 1L 1i 7m.",h=["1Q","1h","1l"],i=23 2X("\\\\b"+f+"\\\\b"),j=f&&!i.11(h.3O()),k=8(a){u b=(""+a).3N(/(?:\\.(\\d+))?$/);n b&&b[1]?b[1].A:0},l=8(a){n 3M.6S(a*3M.6P(10,e))},m=!0;E(j)3K 23 6O(g);n e=k(d),(k(b)>e||l(b)%l(d)!==0)&&(m=!1),7.K(c)||m},1o:8(b,c,d){u e=a(d);n 7.p.3J&&e.1i(".w-1o-Z").A&&e.1c("w-1o-Z").1d("Z.w-1o",8(){a(c).P()}),b===e.1e()},1q:8(b,c,d,e){E(7.K(c))n"2S-2T";e="19"==D e&&e||"1q";u f,g,h,i=7.29(c,e);n 7.p.I[c.q]||(7.p.I[c.q]={}),i.3d=i.3d||7.p.I[c.q][e],7.p.I[c.q][e]=i.1r,d="19"==D d&&{27:d}||d,h=a.2Q(a.G({T:b},d.T)),i.3C===h?i.P:(i.3C=h,f=7,7.4L(c),g={},g[c.q]=b,a.3D(a.G(!0,{2U:"2b",2E:"w"+c.q,6B:"6F",T:g,7k:f.F,26:8(a){u d,g,h,j=a===!0||"7p"===a;f.p.I[c.q][e]=i.3d,j?(h=f.1s,f.30(),f.14=f.28(c),f.1s=h,f.1C.2P(c),f.J[c.q]=!1,f.1J()):(d={},g=a||f.2C(c,{R:e,2h:b}),d[c.q]=i.1r=g,f.J[c.q]=!0,f.1J(d)),i.P=j,f.3H(c,j)}},d)),"1H")}}});u b,c={};n a.3R?a.3R(8(a,b,d){u e=a.2E;"2b"===a.2U&&(c[e]&&c[e].2b(),c[e]=d)}):(b=a.3D,a.3D=8(d){u e=("2U"H d?d:a.50).2U,f=("2E"H d?d:a.50).2E;n"2b"===e?(c[f]&&c[f].2b(),c[f]=b.3G(7,1g),c[f]):b.3G(7,1g)}),a});',
    62,
    460,
    "|||||||this|function|||||||||||||||return||settings|name||||var|validator|validate|type|attr||length|form||typeof|if|currentForm|extend|in|messages|invalid|optional|element|Please|delete|for|valid|void|method||data|errorList|each|enter|removeClass|call|blur||test||required|toHide|null||||string|format|contenteditable|addClass|on|val|errorClass|arguments|number|not|findByName|maxlength|range|rules|pendingRequest|equalTo|groups|remote|message|formSubmitted|console|methods|submitted|date|zA|errorMap|find|add|toShow|successList|Z0|replace|unhighlight|validClass|pending|escapeCssMeta|showErrors|max|is|debug|submitButton|off|Number|text|case|split|checkable|minlength|normalizer|email|min|radio|aria||id||new|check||success|url|errorsFor|previousValue|dateISO|abort|normalizeRule|select|u00a1|value|reset|parameters|currentElements|the|undefined|containers|classRuleSettings|filter|input|constructor|getLength|label|digits|labelContainer|uffff0|focusInvalid|checkbox|wrapper|cancelSubmit|depends|window|ignore|defaultMessage|submit|port|clean|resetForm|substr|describedby|objectLength|toLowerCase|validationTargetFor|false|elementValue|isArray|push|param|rangelength|dependency|mismatch|mode|and|greaterThan|RegExp|module|error|resetInternals|highlight|staticRules|normalizeAttributeRule|hideThese||||||elements|or|hideErrors|originalMessage|define|addWrapper|prepareForm|map|errorElement|showLabel|closest|greaterThanEqual|lessThanEqual|step|characters|remove|submitHandler|defaults|hidden|resetElements|idOrName|pendingClass|checked|than|switch|getAttribute|errorLabelContainer|lessThan|old|ajax|errors|dependTypes|apply|stopRequest|defaultShowErrors|onfocusout|throw|errorPlacement|Math|match|join|parent|formatAndAdd|ajaxPrefilter|invalidElements|html|hide|show|validElements|occurred|errorContainer|init||to|equal|datetime|click||numberOfInvalids|fn|checkForm|invalidHandler|between|field|expr|novalidate|jquery|exports|trim|makeArray|parentNode|focusCleanup|onsubmit|Array|size|trigger|checking|when|Exception|catch|msg|findDefined|strong|ignoreTitle|customDataMessage|customMessage|try|lastIndexOf|grep|lastActive|findLastActive|focusin|textarea|no|file|validity|prepareElement|errorContext|which|startRequest|charAt|toUpperCase|substring|dataRules|attributeRules|creditcard|String|classRules|normalizeRules|break|depend|nodeName|of|warn|ajaxSettings|NaN|autoCreateRanges|addClassRules|01|Date|selected|triggerHandler|it|removeData|option|relies|object|least|long|very|greater|differently|less|168|at|ISO|URL|address|only|same|192|more|again|amd|across|tel|search|password|month|week|color|local|time|keyup|focusout|uffff|The|172|multiple|prototype|valueCache|browsers|button|This|returning|unchecked|filled|blank|prop|unshift|jQuery|Nothing|can|nothing|nPlease|hasClass|appendTo||formnovalidate|currentTarget|don|pseudos|concat|preventDefault|version|use|onclick|keyCode|inArray|deprecated|since|cancel|nbehaves|setDefaults|225|removeAttr|removed|slice|require|be|onfocusin|144|onkeyup|will|fix|254|isFunction|Invalid|else|title|Warning|defined|No|dataType|additional|continue|addMethod|json|log|instanceof|nand|TypeError|toString|012|Step|destroy|Error|pow|boolean|attribute|round|parents|insertAfter|2147483647|524288|rule|isNaN|class|append|wrap|fakepath|js|one|assigned|focus|image|disabled|https|has|Use|locales|_|ftp|visible|locale|127|localizations|badInput|context|ninstead|supported|specific|169|true".split(
      "|"
    ),
    0,
    {}
  )
);