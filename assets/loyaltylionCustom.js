document.addEventListener('DOMContentLoaded', function (event) {
    var load_rules = function (num){
        {% for block in section.blocks %}
            {% if block.settings.btn_link %}
            $('body').on('click','.ll-rules-section .lion-rules-list .lion-rule-item', function (){
                var win =  window.open('{{ block.settings.btn_link }}', '_blank');
                win.focus();
            })
            {% endif %}
        {% endfor %}
    }
  load_rules(0);


// Wrap block content if background image
  var checkExist = setInterval(function () {
        if ($('.lion-rules-list .lion-rule-item').length != 0) { 

            const customertotalPoints = parseInt($('[data-lion-points]').text());
            var pointsNeededText = $('.lion-reward-item__redeem-button--disabled')
            $(pointsNeededText).each(function() {
                var pointsNeeded = parseInt($(this).prevAll('.lion-reward-item__meta').find('.value').text()) * 1000;
                if (customertotalPoints < pointsNeeded) { 
                    $(this).text((pointsNeeded - customertotalPoints) + ' more points needed');
                }
            });
            
            // Birthday text
            const birthdayText = {{ settings_.birthday_text | json}};
            if(birthdayText != '') {
                const customerBirthday = $('.lion-rule-item--birthday .lion-rule-item__limit-reached').text() + birthdayText
                $('.lion-rule-item--birthday .lion-rule-item__limit-reached').text(customerBirthday)
            };

            // Tiers 'You are here text'
            const curentTierText =$('.lion-tier-box__you-are-here').text();
            $('.lion-tier-box--current .lion-tier-box__sub-title').text(curentTierText);
            $('.lion-tier-box--previous .lion-tier-box__sub-title').text('Your Current Tier');

            // Order history date change
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            let dateString,
            dateParts,
            dateObject;

            // Loop through each date cell and update its text
            if ($('.lion-history-table__row-date').length != 0) {
                var dateCells = $('.lion-history-table__row-date');
                $(dateCells).each(function() {
    
                dateString = this.innerText.replaceAll('.','/');
                dateParts = dateString.split("/");
                dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); 
                this.innerText = `${dateObject.getDay()} ${months[dateObject.getMonth()]}  ${dateObject.getFullYear()}`;
                });
    
                // Reveal the hidden history items
                $('.show-history').on('click', function() {
                    console.log('click');
                    $('.ll-history-section').removeClass('partial');
                    $(this).hide();
                })
            }
                
            setTimeout(function(){ 
             // element that will be wrapped
                $( ".lion-rule-item__content" ).wrapInner(function() {
                return "<div class='bg-caption'></div>";
                });

        }, 1000);
            clearInterval(checkExist)
        }
    }, 300) 
});