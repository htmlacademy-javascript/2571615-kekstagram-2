import { hashtagInput, uploadForm, commentInput, MAX_HASHTAG_LENGTH, MAX_HASHTAG_COUNT, MAX_COMMENT_LENGTH } from './constants';

export const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'pristine-error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error',
});

export default function runCheckUpByPristine() {

  const getHashtags = (hashtagInputString)=>hashtagInputString.trim().split(/\s+/);


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
            this.errorHashtags = getHashtags(hashtagInputString).filter((hashtag) => !(hashtag.startsWith('#')));
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
            this.errorHashtags = getHashtags(hashtagInputString).filter((hashtag) => !(/^[#\p{L}\d]+$/u.test(hashtag.slice(1))));
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
            this.errorHashtags = getHashtags(hashtagInputString).filter((hashtag) => (hashtag === '#'));
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
            this.errorHashtags = getHashtags(hashtagInputString).filter((hashtag) => !(hashtag.length <= MAX_HASHTAG_LENGTH));
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
            this.results.length = 0;
            if (!hashtagInputString) {
              return true;
            }
            const uniqueHashtags = new Set();
            const hashtagsArray = getHashtags(hashtagInputString);

            for (const hashtag of hashtagsArray) {

              const lowerHashtag = hashtag.toLowerCase();


              if (uniqueHashtags.has(lowerHashtag)) {
                this.results.push(`Хэштег "${hashtag}" использован дважды.`);
              } else {
                uniqueHashtags.add(lowerHashtag);
              }
            }
            if(this.results.length > 0) {
              return false;
            }
            return true;
          };
        },

        errorText: function() {
          return ()=> `Внимание! Нарушено требование: "один и тот же хэштег не может быть использован дважды".
          ${this.results.join(', ')}`;
        }
      },

      {
        rule: 'validateHashtagCount',
        checkAction: function() {
          return (hashtagInputString)=> {
            if (!hashtagInputString) {
              return true;
            }
            return getHashtags(hashtagInputString).length <= MAX_HASHTAG_COUNT;
          };
        },
        errorText: function() {
          return ()=>'Внимание! Нарушено требование: "Нельзя указать больше пяти хэштегов!';
        }
      }
    ]
  };


  hashtagValidators.rules.forEach((ruleObj) => {
    pristine.addValidator(hashtagInput, ruleObj.checkAction(), ruleObj.errorText());
  });

  pristine.addValidator(commentInput, (comment)=>comment.length <= MAX_COMMENT_LENGTH, 'Длина комментария не должна превышать 140 символов!');

}
