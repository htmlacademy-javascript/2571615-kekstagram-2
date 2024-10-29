import { hashtagInput, uploadForm, commentInput } from './uploadPhotoForm';

const errorsByPristineContainer = document.querySelector('.img-upload__field-wrapper');

export default function runCheckUpByPristine() {

  const hashtags = (hashtagInputString)=>hashtagInputString.trim().split(/\s+/);


  const hashtagValidators = {
    rules: [
      {
        rule: 'startsWithHash',
        errorHashtags: [],
        checkAction: function(){
          return (hashtagInputString)=>{
            if (!hashtagInputString) {
              return true;
            }
            this.errorHashtags = hashtags(hashtagInputString).filter((hashtag) => !(hashtag.startsWith('#')));
            if(this.errorHashtags.length > 0) {
              return false;
            }
            return true;
          };
        },
        errorText: function() {
          return ()=>`Внимание! Нарушено требование: "Хэштег должен начинаться с символа # (решётка)." Допущены ошибки в тегах: ${this.errorHashtags.join(', ')}`;
        }
      },
      {
        rule: 'validCharacters',
        errorHashtags: [],
        checkAction: function() {
          return (hashtagInputString)=>{
            if (!hashtagInputString) {
              return true;
            }
            this.errorHashtags = hashtags(hashtagInputString).filter((hashtag) => !(/^[#\p{L}\d]+$/u.test(hashtag.slice(1))));
            if(this.errorHashtags.length > 0) {
              return false;
            }
            return true;
          };
        },
        errorText: function() {
          return ()=>`Внимание! Нарушено требование: "Строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т.д.".  Допущены ошибки в тегах: ${this.errorHashtags.join(', ')}`;
        }
      },
      {
        rule: 'notOnlyHash',
        errorHashtags: [],
        checkAction: function() {
          return (hashtagInputString)=> {
            if (!hashtagInputString) {
              return true;
            }
            this.errorHashtags = hashtags(hashtagInputString).filter((hashtag) => !(hashtag !== '#'));
            if(this.errorHashtags.length > 0) {
              return false;
            }
            return true;
          };
        },
        errorText: function() {
          return ()=>`Внимание! Нарушено требование: "Хеш-тег не может состоять только из одной решётки". Допущены ошибки в тегах: ${this.errorHashtags.join(', ')}`;
        }
      },
      {
        rule: 'maxLength',
        errorHashtags: [],
        checkAction: function() {
          return (hashtagInputString)=>{
            if (!hashtagInputString) {
              return true;
            }
            this.errorHashtags = hashtags(hashtagInputString).filter((hashtag) => !(hashtag.length <= 20));
            if(this.errorHashtags.length > 0) {
              return false;
            }
            return true;
          };
        },
        errorText: function() {
          return ()=>`Внимание! Нарушено требование: "Максимальная длина одного хэштега - 20 символов, включая решётку". Допущены ошибки в тегах: ${this.errorHashtags.join(', ')}`;
        }
      },
      {
        rule: 'isUnique',
        results: [],
        checkAction: function() {
          return (hashtagInputString)=>{
            if (!hashtagInputString) {
              return true;
            }
            const uniqueHashtags = new Set();

            for (const hashtag of hashtags(hashtagInputString)) {
            // Приводим хэштег к нижнему регистру для проверки на уникальность
              const lowerHashtag = hashtag.toLowerCase();

              // Проверяем на уникальность
              if (uniqueHashtags.has(lowerHashtag)) {
                this.results.push(`Хэштег "${hashtag}" использован дважды.`);
              } else {
                uniqueHashtags.add(lowerHashtag);
              }
              if(this.results.length > 0) {
                return false;
              }
              return true;
            }
          };
        },

        errorText: function() {
          return ()=> `Внимание! Нарушено требование: "один и тот же хэштег не может быть использован дважды". Данный хэштег ${this.results.join(', ')} использован дважды`;
        }
      },

      {
        rule: 'validateHashtagCount',
        checkAction: function() {
          return (hashtagInputString)=> {
            if (!hashtagInputString) {
              return true;
            }
            return hashtags(hashtagInputString).length <= 5;
          };
        },
        errorText: function() {
          return ()=>'Внимание! Нарушено требование: "Нельзя указать больше пяти хэштегов!';
        }
      }
    ]
  };


  const pristine = new Pristine(uploadForm, {
    classTo: 'img-upload__field-wrapper', // класс родительского элемента
    errorClass: 'pristine-error', // класс для ошибки
    errorTextParent: 'img-upload__field-wrapper', // родительский элемент для текста ошибки
    errorTextTag: 'div', // тег для текста ошибки
    errorTextClass: 'img-upload__field-wrapper--error', // класс для текста ошибки
  });

  hashtagValidators.rules.forEach((ruleObj) => {
    pristine.addValidator(hashtagInput, ruleObj.checkAction(), ruleObj.errorText());
  });

  pristine.addValidator(commentInput, (comment)=>comment.length <= 140, 'Длина комментария не должна превышать 140 символов!');

  uploadForm.addEventListener('submit', (evt)=>{
    if (errorsByPristineContainer.classList.contains('pristine-error')) {
      evt.preventDefault();
    }
  });
}
