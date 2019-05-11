let moduleExports = {
  validator_types:
  {
    vRequire: /\S+/,
    //vEmail: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    vEmail: /^\S+@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    vNumber: /^\d+$/,
    vPositive: /^[1-9][0-9]*$/,
    vEnglish: /^[A-Za-z]+$/,
    vChinese: /^[\u0391-\uFFE5]+$/,
    vPhone: /^1[3456789]{1}[0-9]{9}$/, //验证手机号
    vZipCode: /^[1-9][0-9]{5}$/, //验证邮编
  }
};

moduleExports.checkForm = function(formId)
{
  let tBool = true;
  let tMessage = '';
  if ($('#' + formId).length > 0)
  {
    let tFormElements = $('#' + formId + ' input[vType],#' + formId + ' select[vType],#' + formId + ' textarea[vType]');
    let tElementType = '';
    let tName = '';
    let tValue = '';
    let tVType = '';
    let tExpression = '';
    tFormElements.each(function()
    {
      tElementType = $(this).attr('type');
      tName = $(this).attr('Name');
      tValue = $(this).val();
      tVType = $(this).attr('vType');
      tExpression = $(this).attr('vExpression');
      tMessage = $(this).attr('vMessage');
      switch (tElementType)
      {
        case 'radio':
          let tChecked = false;
          $("#" + formId + " input[name='" + tName + "']").each(function()
          {
            if ($(this).prop('checked'))
            {
              tChecked = true;
              return false;
            }
          });
          if (!tChecked)
          {
            $(this).focus();
            tBool = false;
          }
          break;
        default:
          switch (tVType)
          {
            case 'NE':
              if (tValue == tExpression)
              {
                $(this).focus();
                tBool = false;
              }
              break;
            default:
              if (!moduleExports.validator_types['v' + tVType].test(tValue))
              {
                $(this).focus();
                tBool = false;
              }
              break;
          }
          break;
      }
      if (!tBool) return false;
    });
  }
  let res = {
    bool: tBool,
    msg: tMessage
  };
  return res;
};
module.exports = moduleExports;