<template>
    <div class="">
        <div class="margin_top_30">
    		<Form ref="formValidate" :model="formRight" :rules="ruleValidate" label-position="right" :label-width="100">
		        <FormItem label="用户名" prop="name">
		            <Input v-model="formRight.name" size="large" placeholder="请输入用户名" style="width: 300px"></Input>
		        </FormItem>
		        <FormItem label="手机号码" prop="phone">
		            <Input v-model="formRight.phone" size="large" placeholder="请输入手机号码" style="width: 300px"></Input>
		        </FormItem>
		        <FormItem label="密码" prop="pwd">
		            <Input v-model="formRight.pwd" size="large" placeholder="请输入密码" style="width: 300px"></Input>
		        </FormItem>
		        <FormItem label="确认密码" prop="rePwd">
		            <Input v-model="formRight.rePwd" size="large" placeholder="请输入重复密码" style="width: 300px"></Input>
		        </FormItem>
		        <FormItem label="验证码" prop="code">
		            <Input v-model="formRight.code" size="large" placeholder="请输入手机验证码" style="width: 200px"></Input>
		            <Button @click="getCode(60)" :disabled="getCodeDisabled" class="get_code"  size="large">获取验证码</Button>
		        </FormItem>
		        <FormItem>
		        	<Checkbox>我已认真阅读并同意《XXXXX》</Checkbox></a>
		            <Button @click="submit('formValidate')" size="large" type="success" shape="circle" class="all_width bg_title margin_top_10" style="width: 260px">完成并登录</Button>
		        </FormItem>
		    </Form>
    	</div>
    </div>
</template>
<script>

export default {
    components : {
    },
    data() {
    	const passwordSure = (rule, value, callback) => {
            let self = this;
            if (value != self.formRight.pwd ){
                callback(new Error('密码不一致'))
            } else {
                callback();
            }
        };
        return {
			formRight: {
                name: '',
                phone: '',
                pwd: '',
                rePwd: '',
                code: '',
            },
            //密码登录验证
            ruleValidate: {
                name: [
                    { required: true, message: '用户名不能为空!', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '手机号码不能为空!', trigger: 'blur' }
                ],
                pwd: [
                	{ required: true, message: '密码不能为空!', trigger: 'blur' },
                	{type:'string',min:6,message: '请输入6-20位数字、字母、标点符号组合密码!', trigger: 'blur'},
                ],
                rePwd: [
                    { required: true, message: '确认密码不能为空!', trigger: 'blur' },
                    {validator:passwordSure,trigger: 'blur'}
                ],
                code: [
                    { required: true, message: '验证码不能为空!', trigger: 'blur' }
                ],
            },
            //验证码按钮
            getCodeDisabled: true
            
        }
        
    },
    methods: {
		//密码登录
		submit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('Success!');
                } else {
                    this.$Message.error('Fail!');
                }
            })
        },
        //获取验证码
        getCode(countdownTime) {

        },


    }
}
</script>
<style scoped lang='less'>
	/*获取验证码*/
	.get_code{background: #E6E6E6;display: inline-block;width: 97px;text-align: center;}
</style>
