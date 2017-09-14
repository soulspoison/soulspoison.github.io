var rateArray=new Array;
var rateBasic={"sy1268":6.8,"sy1276":6.55,"sy141122":6.15,"sy1531":5.9,"sy15511":5.65,"sy15628":5.4,"sy16526":4.9}
var gjjRateBasic=[4.7,4.5,4.25,4,3.75,3.5,3.25,3.25]
// rate[1]为商代利率，rate[2]为公积金利率
rateArray[1]=new Array;
rateArray[2]=new Array;
rateArray[1][1]=(rateBasic.sy1268*1.1).toFixed(2);
rateArray[1][2]=(rateBasic.sy1268).toFixed(2);
rateArray[1][3]=(rateBasic.sy1268*0.85).toFixed(2);
rateArray[1][4]=(rateBasic.sy1268*0.7).toFixed(2);
rateArray[1][5]=(rateBasic.sy1276*1.1).toFixed(2);
rateArray[1][6]=(rateBasic.sy1276).toFixed(2);
rateArray[1][7]=(rateBasic.sy1276*0.85).toFixed(2);
rateArray[1][8]=(rateBasic.sy1276*0.7).toFixed(2);
rateArray[1][9]=(rateBasic.sy141122*1.1).toFixed(2);
rateArray[1][10]=(rateBasic.sy141122).toFixed(2);
rateArray[1][11]=(rateBasic.sy141122*0.85).toFixed(2);
rateArray[1][12]=(rateBasic.sy141122*0.7).toFixed(2);
rateArray[1][13]=(rateBasic.sy1531*1.1).toFixed(2);
rateArray[1][14]=(rateBasic.sy1531).toFixed(2);
rateArray[1][15]=(rateBasic.sy1531*0.85).toFixed(2);
rateArray[1][16]=(rateBasic.sy1531*0.7).toFixed(2);
rateArray[1][17]=(rateBasic.sy15511*1.1).toFixed(2);
rateArray[1][18]=(rateBasic.sy15511).toFixed(2);
rateArray[1][19]=(rateBasic.sy15511*0.85).toFixed(2);
rateArray[1][20]=(rateBasic.sy15511*0.7).toFixed(2);
rateArray[1][21]=(rateBasic.sy15628*1.1).toFixed(2);
rateArray[1][22]=(rateBasic.sy15628).toFixed(2);
rateArray[1][23]=(rateBasic.sy15628*0.85).toFixed(2);
rateArray[1][24]=(rateBasic.sy15628*0.7).toFixed(2);
rateArray[1][25]=(rateBasic.sy16526*1.1).toFixed(2);
rateArray[1][26]=(rateBasic.sy16526).toFixed(2);
rateArray[1][27]=(rateBasic.sy16526*0.85).toFixed(2);
rateArray[1][28]=(rateBasic.sy16526*0.7).toFixed(2);
rateArray[2][1]=4.2;
rateArray[2][2]=4;
rateArray[2][3]=3.75;
rateArray[2][4]=3.5;
rateArray[2][5]=3.25;
rateArray[2][6]=3;
rateArray[2][7]=2.75;
rateArray[2][8]=2.75;
function nvl(val){
    return val==null||val==""?0:val;
};
String.prototype.in=function(array){
    var result=false;
    for(var i=0;i<array.length;i++){
        if(this==array[i]){
            result=true;
            break;
        }
    }
    return result;
};
function calculatorForm($form){
    var msg="";
    var msgContainer='<div class="form-line error-msg-line"></div>';
    var msgDom='<p class="error-msg-tip"></p>'
    var _self=this;
    function popErrorMsg($element,msg){
        var $inputLine=$element.parents(".input-item");
        var $msgDom=$(msgDom);
        $msgDom.text(msg);
        $inputLine.append($msgDom);
        //$formLine.after($msgContainer);
    }
    this.initMsg=function(){
        $form.find(".error-msg-tip,.error-msg-line").remove();
    }
    this.clearMsg=function($element){
        $element.parent().find(".error-msg-tip").remove();
        $element.parents(".form-line").attr("style","");
    }
    this.validation=function(){
        var validStatus=true;
        _self.initMsg();
        $form.find("input[type=number]").each(function(){
            //忽略校验
            if($(this).hasClass("ignore")) return false;
            var val=$(this).val();
            var validCategory=$(this).attr("valid-category");
            if(validCategory==undefined){
                validCategory="";
            }
            // 数字校验
            if(/^(0\.?[0-9]*|[1-9]+[0-9]*\.?[0-9]*)$/.test(val)==false){
                popErrorMsg($(this),"请输入数字")
                validStatus=false;
                return;
            };
            // 特殊规则校验
            if(validCategory.in(['door','room'])){
                if(val<0.9){
                    popErrorMsg($(this),"数值必须大于0.9！");
                    validStatus=false;
                    return;
                }
            }
        })
        return validStatus;
    }
    $form.find("input[type=number]").focus(function(){
        _self.clearMsg($(this));
    });
    this.loanCalculator=function(infos){
        var loan={};
        if(infos.loanPayType=="本息"){
            // 等额本息
            if((infos.loanType).in([1,2])){
                //商业贷款
                loan.monthPay=infos.loanTotal*infos.rate*Math.pow(1+infos.rate,infos.month)/(Math.pow(1+infos.rate,infos.month)-1);
                loan.monthPay=loan.monthPay.toFixed(2);
                loan.totalPay=(loan.monthPay*infos.month).toFixed(2);
                loan.totalInterest=(loan.totalPay-infos.loanTotal).toFixed(2);
            }else if(infos.loanType==3){
                //组合贷款
                loan.monthPay=infos.loanTotalSy*infos.rateSy*Math.pow(1+infos.rateSy,infos.month)/(Math.pow(1+infos.rateSy,infos.month)-1);
                loan.monthPay+=infos.loanTotalGjj*infos.rateGjj*Math.pow(1+infos.rateGjj,infos.month)/(Math.pow(1+infos.rateGjj,infos.month)-1);
                loan.monthPay=loan.monthPay.toFixed(2);
                loan.totalPay=(loan.monthPay*infos.month).toFixed(2);
                loan.totalInterest=(loan.totalPay-infos.loanTotalSy-infos.loanTotalGjj).toFixed(2);
            }
        }else{
            //等额本金
            if((infos.loanType).in([1,2])){
                //商业贷款
                var fixedMoney=infos.loanTotal/infos.month;
                loan.firstMonth=infos.loanTotal*infos.rate+fixedMoney;
                loan.reduce=fixedMoney*infos.rate;
                loan.totalInterest=(infos.loanTotal/infos.month+infos.loanTotal*infos.rate)+(infos.loanTotal*(1+infos.rate)/infos.month);
                loan.totalInterest=(loan.totalInterest*infos.month/2)-infos.loanTotal;
                loan.totalPay=loan.totalInterest+infos.loanTotal;
            }else if(infos.loanType==3){
                //组合贷款
                var fixedMoneySy=infos.loanTotalSy/infos.month;
                var fixedMoneyGjj=infos.loanTotalGjj/infos.month;
                loan.firstMonth=(infos.loanTotalSy*infos.rateSy+fixedMoneySy)+(infos.loanTotalGjj*infos.rateGjj+fixedMoneyGjj);
                loan.reduce=(fixedMoneySy*infos.rateSy)+(fixedMoneyGjj*infos.rateGjj);
                loan.totalInterestSy=(infos.loanTotalSy/infos.month+infos.loanTotalSy*infos.rateSy)+(infos.loanTotalSy*(1+infos.rateSy)/infos.month);
                loan.totalInterestSy=(loan.totalInterestSy*infos.month/2)-infos.loanTotalSy
                loan.totalInterestGjj=(infos.loanTotalGjj/infos.month+infos.loanTotalGjj*infos.rateGjj)+(infos.loanTotalGjj*(1+infos.rateGjj)/infos.month);
                loan.totalInterestGjj=(loan.totalInterestGjj*infos.month/2)-infos.loanTotalGjj
                loan.totalInterest=loan.totalInterestGjj+loan.totalInterestSy;
                loan.totalPay=loan.totalInterest+infos.loanTotalGjj+infos.loanTotalSy;
            }
            loan.firstMonth=(loan.firstMonth).toFixed(2);
            loan.reduce=(loan.reduce).toFixed(2);
            loan.totalInterest=(loan.totalInterest).toFixed(2);
            loan.totalPay=(loan.totalPay).toFixed(2);
        }
        return loan;
    }
    this.prepayCalculator=function(infos){
        var loan={};
        var durationMonth=0;
        var sinceInterest=0,sinceBenJin=0;
        var leftBenjin=0;
        var leftMonth=0;
        durationMonth=(infos.prePayPredictYear-infos.prePayFirstYear-1)*12+(12-infos.prePayFirstMonth+1)+(infos.prePayPredictMonth)-1;
        if(infos.loanPayType=="本息"){
            loan.oldMonthPay=infos.loanTotal*infos.rate*Math.pow(1+infos.rate,infos.month)/(Math.pow(1+infos.rate,infos.month)-1);
            loan.oldTotalPay=loan.oldMonthPay*infos.month;
            loan.oldTotalInterest=loan.oldTotalPay-infos.loanTotal;
            for(var i=0;i<durationMonth;i++){
                var thisMonthInterest=(infos.loanTotal-sinceBenJin)*infos.rate;
                sinceInterest+=thisMonthInterest;
                sinceBenJin+=loan.oldMonthPay-thisMonthInterest;
            }
            leftBenjin=infos.loanTotal-sinceBenJin;
            if(infos.prePayType==1){
                // 一次性还款
                loan.monthPay=0;
                loan.lastYear=infos.prePayPredictYear;
                loan.lastMonth=infos.prePayPredictMonth;
                loan.oldLastYear=parseInt(infos.prePayFirstYear)+parseInt(infos.month/12);
                loan.oldLastMonth=infos.prePayFirstMonth-1;
                loan.oldLastMonth=(loan.oldLastMonth==0)?12:loan.oldLastMonth;
                loan.sinceTotal=loan.oldMonthPay*durationMonth;
                loan.sinceInterest=sinceInterest;
                loan.predictTotal=leftBenjin*(1+infos.rate);
                //节省利息＝原还款总额－但前还款累计-一次全部还款金额
                loan.reduceInterest=loan.oldTotalPay-loan.sinceTotal-leftBenjin;
            }else{
                // 部分还款
                leftBenjin=leftBenjin-infos.prepayAmount;
                if(infos.prePayFor==1){
                    //还款不变
                    leftMonth=Math.log(loan.oldMonthPay/(loan.oldMonthPay-(leftBenjin*infos.rate)))/Math.log(1+infos.rate);
                    leftMonth=Math.round(leftMonth);
                    // loan.monthPay=leftBenjin*infos.rate*Math.pow(1+infos.rate,leftMonth)/(Math.pow(1+infos.rate,leftMonth)-1);
                    loan.monthPay=loan.oldMonthPay;
                    //预期还款年份＋取整(剩余月份/12)＋取绝对值((求模(剩余月份/12)+预期还款月份－12)/12);
                    loan.lastYear=infos.prePayPredictYear+parseInt(leftMonth/12)+Math.abs((leftMonth%12+infos.prePayPredictMonth-12)/12);
                    loan.lastMonth=leftMonth%12+infos.prePayPredictMonth-12;
                    if(loan.lastMonth==0){
                        loan.lastMonth=12
                    }else if(loan.lastMonth<0){
                        loan.lastMonth=Math.abs(loan.lastMonth);
                    }
                    loan.oldLastYear=parseInt(infos.prePayFirstYear)+parseInt(infos.month/12);
                    loan.oldLastMonth=infos.prePayFirstMonth-1;
                    loan.oldLastMonth=(loan.oldLastMonth==0)?12:loan.oldLastMonth;
                    loan.sinceTotal=loan.oldMonthPay*durationMonth;
                    loan.sinceInterest=sinceInterest;
                    loan.predictTotal=loan.oldMonthPay+infos.prepayAmount;
                    //节省利息＝原还款总额－但前还款累计－(新每月还款x剩余月份)-一次还款金额
                    loan.reduceInterest=loan.oldTotalPay-(loan.oldMonthPay*durationMonth)-(loan.monthPay*leftMonth)-infos.prepayAmount;
                }else{
                    //期限不变
                    leftMonth=infos.month-durationMonth;
                    loan.monthPay=leftBenjin*infos.rate*Math.pow(1+infos.rate,leftMonth)/(Math.pow(1+infos.rate,leftMonth)-1);
                    loan.oldLastYear=parseInt(infos.prePayFirstYear)+parseInt(infos.month/12);
                    loan.oldLastMonth=infos.prePayFirstMonth-1;
                    loan.oldLastMonth=(loan.oldLastMonth==0)?12:loan.oldLastMonth;
                    loan.lastYear=loan.oldLastYear;
                    loan.lastMonth=loan.oldLastMonth;
                    loan.sinceTotal=loan.oldMonthPay*durationMonth;
                    loan.sinceInterest=sinceInterest;
                    loan.predictTotal=loan.oldMonthPay+infos.prepayAmount;
                    //节省利息＝原还款总额－但前还款累计－(新每月还款x剩余月份)-一次还款金额
                    loan.reduceInterest=loan.oldTotalPay-(loan.oldMonthPay*durationMonth)-(loan.monthPay*leftMonth)-infos.prepayAmount;
                }
            }
        }else{
            // 等额本金
            var fixedMoney=infos.loanTotal/infos.month;
            var predictMonthPay=0;
            loan.oldFirstMonth=infos.loanTotal*infos.rate+fixedMoney;
            loan.oldReduce=fixedMoney*infos.rate;
            loan.oldTotalInterest=(infos.loanTotal/infos.month+infos.loanTotal*infos.rate)+(infos.loanTotal*(1+infos.rate)/infos.month);
            loan.oldTotalInterest=(loan.oldTotalInterest*infos.month/2)-infos.loanTotal;
            loan.oldTotalPay=loan.oldTotalInterest+infos.loanTotal;
            loan.oldLastYear=parseInt(infos.prePayFirstYear)+parseInt(infos.month/12);
            loan.oldLastMonth=infos.prePayFirstMonth-1;
            loan.oldLastMonth=(loan.oldLastMonth==0)?12:loan.oldLastMonth;
            for(var i=0;i<durationMonth;i++){
                var thisMonthInterest=(infos.loanTotal-sinceBenJin)*infos.rate;
                sinceInterest+=thisMonthInterest;
                sinceBenJin+=fixedMoney;
                if(i+1==durationMonth){
                    predictMonthPay=thisMonthInterest+fixedMoney;
                }
            }
            leftBenjin=infos.loanTotal-sinceBenJin;
            if(infos.prePayType==1){
                //一次性还款
                loan.lastYear=infos.prePayPredictYear;
                loan.lastMonth=infos.prePayPredictMonth;
                // 当前还款本金＋当前还款利息
                loan.sinceTotal=sinceBenJin+sinceInterest;
                loan.sinceInterest=sinceInterest;
                loan.predictTotal=predictMonthPay+leftBenjin-fixedMoney;
                loan.firstMonth=0;
                loan.reduceInterest=loan.oldTotalPay-loan.sinceTotal-leftBenjin;
            }else{
                leftBenjin=leftBenjin-infos.prepayAmount;
                if(infos.prePayFor==1){
                    //还款不变
                    leftMonth=leftBenjin/fixedMoney;
                    leftMonth=Math.round(leftMonth);
                    loan.lastYear=infos.prePayPredictYear+parseInt(leftMonth/12)+Math.abs((leftMonth%12+infos.prePayPredictMonth-12)/12);
                    loan.lastMonth=leftMonth%12+infos.prePayPredictMonth-12;
                    if(loan.lastMonth==0){
                        loan.lastMonth=12
                    }else if(loan.lastMonth<0){
                        loan.lastMonth=Math.abs(loan.lastMonth);
                    }
                    loan.sinceTotal=sinceBenJin+sinceInterest;
                    loan.sinceInterest=sinceInterest;
                    loan.totalInterest=(leftBenjin/leftMonth+leftBenjin*infos.rate)+(leftBenjin*(1+infos.rate)/leftMonth);
                    loan.totalInterest=(loan.totalInterest*leftMonth/2)-leftBenjin;
                    loan.totalPay=loan.totalInterest+leftBenjin;
                    loan.predictTotal=predictMonthPay+infos.prepayAmount;
                    loan.firstMonth=leftBenjin*infos.rate+fixedMoney;
                    loan.reduceInterest=loan.oldTotalPay-infos.prepayAmount-loan.sinceTotal-loan.totalPay;
                }else{
                    //期限不变
                    leftMonth=infos.month-durationMonth;
                    leftMonth=Math.round(leftMonth);
                    fixedMoney=leftBenjin/leftMonth;
                    loan.lastYear=loan.oldLastYear;
                    loan.lastMonth=loan.oldLastMonth;
                    loan.sinceTotal=sinceBenJin+sinceInterest;
                    loan.sinceInterest=sinceInterest;
                    loan.totalInterest=(leftBenjin/leftMonth+leftBenjin*infos.rate)+(leftBenjin*(1+infos.rate)/leftMonth);
                    loan.totalInterest=(loan.totalInterest*leftMonth/2)-leftBenjin;
                    loan.totalPay=loan.totalInterest+leftBenjin;
                    loan.predictTotal=predictMonthPay+infos.prepayAmount;
                    loan.firstMonth=leftBenjin*infos.rate+fixedMoney;
                    loan.reduceInterest=loan.oldTotalPay-infos.prepayAmount-loan.sinceTotal-loan.totalPay;
                }
            }
        }
        for(var item in loan){
            if(item.in(['sinceTotal','sinceInterest','totalInterest','totalPay','predictTotal','firstMonth','reduceInterest','oldMonthPay','oldFirstMonth','oldReduce'])){
                loan[item]=parseFloat(loan[item]).toFixed(2);
            }else{
                loan[item]=Math.round(loan[item]);
            }
        }
        return loan;
    }
};
// function wallCalculator(infos,calcType){
calculatorForm.prototype.Calculator=function(infos,calcType){
    if(infos==undefined||infos==null) return;
    var pureTotal,removeTotal,finalTotal;
    var loadPay={};
    var paintCalc={};
    if(calcType=="wall"){
        // 版本迭代2016-8-5：移除房门和窗户信息
        pureTotal=(infos.houseLength/infos.brickLength)*(infos.houseHeight/infos.brickWidth)*2;
        pureTotal+=(infos.houseWidth/infos.brickLength)*(infos.houseHeight/infos.brickWidth)*2;
        // 窗户和房门信息
        // removeTotal=(infos.windowLength/infos.brickLength)*(infos.windowWidth/infos.brickWidth)*infos.windowAmount;
        // removeTotal+=(infos.doorLength/infos.brickLength)*(infos.doorWidth/infos.brickWidth)*infos.doorAmount;
        removeTotal=pureTotal;
        finalTotal=removeTotal*1.08*0.9;
    }else if(calcType=="brick"){
        //pureTotal=(infos.houseLength/infos.brickLength)*(infos.houseWidth/infos.brickWidth);
        pureTotal=infos.houseArea/(infos.brickLength*infos.brickWidth);
        finalTotal=pureTotal*1.08;
    }else if(calcType=="wallpaper"){
        pureTotal=(infos.houseLength+infos.houseWidth)*2*10/infos.wallpaperSize;
        finalTotal=pureTotal/Math.round(10/(infos.houseHeight*1.1));
    }else if(calcType=="painting"){
        //pureTotal=infos.houseLength*infos.houseWidth + infos.houseLength*infos.houseHeight*2+infos.houseWidth*infos.houseHeight*2;
        //removeTotal=infos.windowLength*infos.windowWidth*infos.windowAmount + infos.doorLength*infos.doorWidth*infos.doorAmount;
        // finalTotal=(pureTotal-removeTotal)/infos.paintingRate;
        paintCalc.buttom=Math.ceil(infos.houseArea*0.8*2.5/50);
        paintCalc.surface=Math.ceil((infos.houseArea*0.8*2.5/50)*2);
    }else if(calcType=="floor"){
        //pureTotal=(infos.houseLength*1000/infos.floorlength)*(infos.houseWidth*1000/infos.floorWidth);
        pureTotal=infos.houseArea*1000000/(infos.floorlength*infos.floorWidth);
        finalTotal=(infos.floorType=="实木地板")?pureTotal*1.08:pureTotal*1.05;
    }else if(calcType=="curtain"){
        pureTotal=(infos.windowWidth+0.3)*2;
        removeTotal=infos.windowLength+0.85;
        finalTotal=pureTotal*removeTotal/infos.curtainWidth;
    }else if(calcType=="fitment"){
        loadPay.fitmentMonth=infos.fitmentTotal*infos.fitmentRate*30*Math.pow(1+infos.fitmentRate*30,infos.fitmentPeriod);
        loadPay.fitmentMonth=loadPay.fitmentMonth/(Math.pow(1+infos.fitmentRate*30,infos.fitmentPeriod)-1);
        loadPay.fitmentMonth=(loadPay.fitmentMonth).toFixed(2);
        loadPay.fitmentTotal=(loadPay.fitmentMonth*infos.fitmentPeriod).toFixed(2);
    }else if(calcType=="loan"){
        loadPay=this.loanCalculator(infos);
    }else if(calcType=="prepay"){
        loadPay=this.prepayCalculator(infos);
    }
    if(calcType=="fitment"||calcType=="loan"||calcType=="prepay"){
        return loadPay;
    }else{
        if(calcType=="painting"){
            return paintCalc;
        }else if(calcType=="wallpaper"){
            return finalTotal>=0?Math.ceil(finalTotal):0;
        }else{
            return finalTotal>=0?Math.round(finalTotal):0;
        }
    }

};
$(function(){
    function resizeSelectPadding($select){
        // 动态调整select里的padding数值，且做了rem的切换
        $(".vitrle-span").remove();
        var innerText=$select.find("option:selected").text();
        var $Vspan=$('<span class="vitrle-span" style="font-size:0.56rem;position:fixed;top:-100px;">'+innerText+'</span>');
        $('body').append($Vspan);
        var strWidth=$(".vitrle-span").width();
        var rem=$('html').css("font-size");
        rem = rem.replace('px','');
        var paddingLeft=(strWidth+20)/parseFloat(rem);
        $select.css("padding-left",''+(9-paddingLeft)+'rem');
    }
    $(".loan-select").each(function(){
        resizeSelectPadding($(this));
    });
    $(".loan-select").change(function(){
        resizeSelectPadding($(this));
    });
    $(".back-arrow").click(function(){
        window.history.go(-1);
    });

    if($(".loan-container").length>0){
        // tab切换
        $("li",".loan-tabs").click(function(){
            var tabTarget=$(this).attr("tab-target");
            $(this).addClass("active").siblings().removeClass("active");
            switch(tabTarget){
                case 'tab-sy':
                    $('input[name=loan-type]').val(1);
                    $('input[name=loan-total-sy]').removeClass('ignore').parent().show();
                    $('input[name=loan-total-gjj]').addClass('ignore').parent().hide();
                    $('select[name=loan-rate-select-sy]').parent().show();
                    $('select[name=loan-rate-select-gjj]').parent().hide();
                    break;
                case 'tab-gjj':
                    $('input[name=loan-type]').val(2);
                    $('input[name=loan-total-gjj]').removeClass('ignore').parent().show();
                    $('input[name=loan-total-sy]').addClass('ignore').parent().hide();
                    $('select[name=loan-rate-select-gjj]').parent().show();
                    $('select[name=loan-rate-select-sy]').parent().hide();
                    break;
                case 'tab-component':
                    $('input[name=loan-type]').val(3);
                    $('input[name=loan-total-sy]').removeClass('ignore').parent().show();
                    $('input[name=loan-total-gjj]').removeClass('ignore').parent().show();
                    $('select[name=loan-rate-select-gjj]').parent().show();
                    $('select[name=loan-rate-select-sy]').parent().show();
                    break;
            };
        });
    };
    if($(".prepay-container").length>0){
        $(".loan-select").each(function(){
            resizeSelectPadding($(this));
        });
        $(".loan-select").change(function(){
            resizeSelectPadding($(this));
        });
        // tab切换
        $("li",".loan-tabs").click(function(){
            var tabTarget=$(this).attr("tab-target");
            $(this).addClass("active").siblings().removeClass("active");
            switch(tabTarget){
                case 'tab-sy':
                    $('input[name=loan-type]').val(1);
                    $('select[name=loan-rate-select-sy]').parent().show();
                    $('select[name=loan-rate-select-gjj]').parent().hide();
                    break;
                case 'tab-gjj':
                    $('input[name=loan-type]').val(2);
                    $('select[name=loan-rate-select-gjj]').parent().show();
                    $('select[name=loan-rate-select-sy]').parent().hide();
                    break;
            };
        });
        $('select[name=prepay-type]').change(function(){
            var val=$(this).val();
            if(val==2){
                $("input[name=prepay-amount]").parent().show();
                $("select[name=prepay-for]").parent().show();
                $("input[name=prepay-amount]").removeClass('ignore');
            }else{
                $("input[name=prepay-amount]").parent().hide();
                $("select[name=prepay-for]").parent().hide();
                $("input[name=prepay-amount]").addClass('ignore');
            }
        });
    };

    // 墙砖选择
    $("select[name=brick-size-select],select[name=wall-size-select]").change(function(){
        var val=parseInt($(this).val());
        var $parent=$(this).parents(".input-panel");
        var brickLength,brickWidth;
        var brickType=$(this).attr("name");
        if(brickType == "wall-size-select"){
            if(val==2){
                brickLength=200;
                brickWidth=200;
            }else if(val==3){
                brickLength=300;
                brickWidth=300;
            }else if(val==4){
                brickLength=400;
                brickWidth=400;
            }else if(val==5){
                brickLength=500;
                brickWidth=500;
            }else if(val==6){
                brickLength=600;
                brickWidth=600;
            }else if(val==7){
                brickLength=800;
                brickWidth=800;
            }else if(val==8){
                brickLength=300;
                brickWidth=200;
            }else if(val==9){
                brickLength=300;
                brickWidth=450;
            };
        }else if(brickType == "brick-size-select"){
            if(val==1){
                brickLength=200;
                brickWidth=200;
            }else if(val==2){
                brickLength=300;
                brickWidth=300;
            }else if(val==3){
                brickLength=400;
                brickWidth=400;
            }else if(val==4){
                brickLength=500;
                brickWidth=500;
            }else if(val==5){
                brickLength=600;
                brickWidth=600;
            }else if(val==6){
                brickLength=800;
                brickWidth=800;
            };
        };
        if(val==0){
            $parent.find("input[name=brick-length]").attr("disabled",false).removeClass("ignore");
            $parent.find("input[name=brick-width]").attr("disabled",false).removeClass("ignore");
        }else{
            $parent.find("input[name=brick-length]").val(brickLength).attr('disabled',true).addClass("ignore");
            $parent.find("input[name=brick-width]").val(brickWidth).attr('disabled',true).addClass("ignore");
        }

    });
    $("select[name=floor-size-select]").change(function(){
        var val=parseInt($(this).val());
        var $parent=$(this).parents(".input-panel");
        var floorLength,floorWidth;
        if(val==1){
            floorLength=600;
            floorWidth=90;
        }else if(val==2){
            floorLength=750;
            floorWidth=90;
        }else if(val==3){
            floorLength=900;
            floorWidth=90;
        }else if(val==4){
            floorLength=1285;
            floorWidth=192;
        }
        if(val==0){
            $parent.find("input[name=floor-length]").attr("disabled",false).removeClass("ignore");
            $parent.find("input[name=floor-width]").attr("disabled",false).removeClass("ignore");
        }else{
            $parent.find("input[name=floor-length]").val(floorLength).attr('disabled',true).addClass("ignore");
            $parent.find("input[name=floor-width]").val(floorWidth).attr('disabled',true).addClass("ignore");
        }
    });
    var myCalcForm=new calculatorForm($(".input-panel"));
    // get name of calculator
    var calcName=$("input[name=calcName]").val();
    // 计算按钮事件
    $(".calc-submit").click(function(){
        $("#calc-result").hide();
        //data validation
        var validStatus=myCalcForm.validation();
        var infos={},result;
        if(validStatus){
            //display compute result
            $("#calc-result").show().addClass("show");
            window.scrollTo(0,document.body.scrollHeight);
            if(calcName.in(["wall","brick","wallpaper","painting","floor","curtain"])){
                infos.houseLength=parseFloat($("input[name=house-length]").val());
                infos.houseWidth=parseFloat($("input[name=house-width]").val() );
                infos.houseHeight=parseFloat($("input[name=house-height]").val() );
                infos.houseArea=parseFloat($("input[name=house-area]").val());
                infos.doorWidth=parseFloat($("input[name=door-width]").val() );
                infos.doorLength=parseFloat($("input[name=door-length]").val() );
                infos.doorWidth=parseFloat($("input[name=door-width]").val() );
                infos.doorAmount=parseFloat($("input[name=door-amount]").val() );
                infos.windowLength=parseFloat($("input[name=window-length]").val() );
                infos.windowWidth=parseFloat($("input[name=window-width]").val() );
                infos.windowAmount=parseFloat($("input[name=window-amount]").val() );
                infos.brickLength=parseFloat($("input[name=brick-length]").val()/1000 );
                infos.brickWidth=parseFloat($("input[name=brick-width]").val()/1000 );
                infos.wallpaperSize=parseFloat($("input[name=wallpaper-size]").val() );
                infos.paintingRate=parseFloat($("input[name=painting-rate]").val() );
                infos.floorType=$("select[name=floor-type]").val();
                infos.floorlength=parseFloat($("input[name=floor-length]").val() );
                infos.floorWidth=parseFloat($("input[name=floor-width]").val() );
                infos.curtainWidth=parseFloat($("input[name=curtain-width]").val() );
            }else if(calcName == "loan"){
                var loanType=$("input[name=loan-type]").val();
                var loanYear=$("select[name=loan-period]").val();
                var rateSelectSy=$("select[name=loan-rate-select-sy]").val();
                var rateSelectGjj=$("select[name=loan-rate-select-gjj]").val();
                var rateGjj,rateSY;
                if(loanYear>5){
                    rateGjj=gjjRateBasic[rateSelectGjj];
                }else{
                    rateGjj=rateArray[2][rateSelectGjj];
                };
                rateSy=rateArray[1][rateSelectSy];
                if(loanType==1){
                    infos.rate=parseFloat(rateSy/100/12);
                }else if(loanType==2){
                    infos.rate=parseFloat(rateGjj/100/12);
                }
                infos.month=parseFloat($("select[name=loan-period]").val()*12);
                infos.rateSy=parseFloat(rateSy/100/12);
                infos.rateGjj=parseFloat(rateGjj/100/12);
                infos.loanType=loanType;
                infos.loanPayType=$("select[name=loan-pay-type]").val();
                infos.loanTotalSy=parseFloat($("input[name=loan-total-sy]").val()*10000);
                infos.loanTotalGjj=parseFloat($("input[name=loan-total-gjj]").val()*10000);
                switch(loanType){
                    case '1':
                        infos.loanTotal=infos.loanTotalSy;
                        break;
                    case '2':
                        infos.loanTotal=infos.loanTotalGjj;
                        break;
                    case '3':
                        infos.loanTotal=infos.loanTotalSy+infos.loanTotalGjj;
                        break;
                }
            }else if(calcName == "prepay"){
                // 提前还款
                var loanType=$("input[name=loan-type]").val();
                var loanYear=$("select[name=loan-period]").val();
                var rateSelectSy=$("select[name=loan-rate-select-sy]").val();
                var rateSelectGjj=$("select[name=loan-rate-select-gjj]").val();
                var rateGjj,rateSY;
                if(loanYear>5){
                    rateGjj=gjjRateBasic[rateSelectGjj];
                }else{
                    rateGjj=rateArray[2][rateSelectGjj];
                };

                rateSy=rateArray[1][rateSelectSy];
                if(loanType==1){
                    infos.rate=parseFloat(rateSy/100/12);
                }else if(loanType==2){
                    infos.rate=parseFloat(rateGjj/100/12);
                }
                infos.month=parseFloat($("select[name=loan-period]").val()*12);
                infos.loanPayType=$("select[name=loan-pay-type]").val();
                infos.loanTotal=parseFloat($("input[name=loan-total]").val())*10000;
                var firstDate=$("input[name=prepay-first-date]").val();
                firstDate=firstDate.split('-');
                infos.prePayFirstYear=parseInt(firstDate[0]);
                infos.prePayFirstMonth=parseInt(firstDate[1]);
                var predictDate=$("input[name=prepay-predict-date]").val();
                predictDate=predictDate.split('-');
                infos.prePayPredictYear=parseInt(predictDate[0]);
                infos.prePayPredictMonth=parseInt(predictDate[1]);
                infos.prePayFor=$("select[name=prepay-for]").val();
                infos.prePayType=$("select[name=prepay-type]").val();
                infos.prepayAmount=parseFloat($("input[name=prepay-amount]").val())*10000;
            }
            result=myCalcForm.Calculator(infos,calcName);
            if(calcName.in(["wall","brick","wallpaper","painting","floor","curtain"])){
                if(calcName=='painting'){
                    $('.result-paint-b .result-value').text(result.buttom);
                    $('.result-paint-f .result-value').text(result.surface);
                }else{
                    $("#calc-result").find(".result-value").text(result);
                }
            }else if(calcName=="loan"){
                if(infos.loanPayType=="本金"){
                    $(".loan-rst-list").find("input[name=result-month-pay]").val(result.firstMonth+'元  '+'每月递减'+result.reduce);
                }else{
                    $(".loan-rst-list").find("input[name=result-month-pay]").val(result.monthPay);
                }
                $(".loan-rst-list").find("input[name=result-total-interest]").val(result.totalInterest);
                $(".loan-rst-list").find("input[name=result-loan-totalpay]").val(result.totalPay);
                $(".loan-rst-list").find("input[name=result-loan-total]").val(infos.loanTotal/10000);
                $(".loan-rst-list").find("input[name=result-loan-period]").val(infos.month/12);
            }else if(calcName=="prepay"){
                console.log(result);
                if(infos.loanPayType=="本金"){
                    $("input[name=result-next-first]").val(result.firstMonth+'元  '+'每月递减'+result.oldReduce);
                    $("input[name=result-old-first]").val(result.oldFirstMonth);
                }else{
                    $("input[name=result-next-first]").val(result.monthPay);
                    $("input[name=result-old-first]").val(result.oldMonthPay);
                }
                $("input[name=result-this-month]").val(result.predictTotal);

                $("input[name=result-since-total]").val(result.sinceTotal);
                $("input[name=result-since-interest]").val(result.sinceInterest);
                $("input[name=result-save-interest]").val(result.reduceInterest);
                $("input[name=result-old-date]").val(result.oldLastYear+'年'+result.oldLastMonth+'月');
                $("input[name=result-new-date]").val(result.lastYear+'年'+result.lastMonth+'月');
            }
        }
    });
});